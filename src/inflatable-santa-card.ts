import { LitElement, html, nothing, svg, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { blower, defs, ground, halo, heap, ropes, santa, shadow } from "./art";
import { hassLang, localize } from "./localize";
import type { ActionConfig, HomeAssistant, InflatableSantaCardConfig, Scene, WarningInfo } from "./types";
import {
  buildScene,
  clamp,
  directionLabel,
  readWarning,
  readWind,
  seeded,
} from "./utils";
import "./editor";

const CARD_VERSION = "1.0.0";
const CARD_TAG = "inflatable-santa-card";

console.info(
  `%c INFLATABLE-SANTA-CARD %c v${CARD_VERSION} `,
  "color:#fff;background:#d81f26;font-weight:700;border-radius:3px 0 0 3px",
  "color:#d81f26;background:#fff;font-weight:700;border-radius:0 3px 3px 0",
);

const ON_STATES = new Set(["on", "open", "playing", "home"]);

const fireEvent = (node: EventTarget, type: string, detail?: unknown): void => {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
};

@customElement(CARD_TAG)
export class InflatableSantaCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: InflatableSantaCardConfig;
  /** true once the first render is done – before that, states are shown without animation */
  @state() private _animate = false;

  private _holdTimer?: number;
  private _held = false;
  private _tapTimer?: number;
  private _lastIsOn?: boolean;

  static styles = cardStyles;

  public static getConfigElement(): HTMLElement {
    return document.createElement(`${CARD_TAG}-editor`);
  }

  public static getStubConfig(hass: HomeAssistant): Partial<InflatableSantaCardConfig> {
    const ids = Object.keys(hass?.states ?? {});
    const find = (pred: (id: string) => boolean) => ids.find(pred);
    const switchIds = ids.filter((id) => id.startsWith("switch."));
    const entity =
      switchIds.find((id) => /santa|weihnacht|nikolaus|xmas|christmas/i.test(id)) ?? switchIds[0] ?? "";
    const wind_speed_entity = find(
      (id) => id.startsWith("sensor.") && hass.states[id].attributes.device_class === "wind_speed",
    );
    const wind_direction_entity = find(
      (id) => id.startsWith("sensor.") && /wind_?(direction|bearing|richtung)|windrichtung/i.test(id),
    );
    const warning_entity = find((id) => id.startsWith("sensor.") && /current_warning_level/i.test(id));
    const weather_entity = find((id) => id.startsWith("weather."));
    const stub: Partial<InflatableSantaCardConfig> = { entity };
    if (wind_speed_entity) stub.wind_speed_entity = wind_speed_entity;
    if (wind_direction_entity) stub.wind_direction_entity = wind_direction_entity;
    if (warning_entity) stub.warning_entity = warning_entity;
    if (weather_entity) stub.weather_entity = weather_entity;
    return stub;
  }

  public setConfig(config: InflatableSantaCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = {
      show_name: true,
      show_info: true,
      show_weather_effects: true,
      storm_threshold: 50,
      view_direction: 0,
      ...config,
    };
  }

  public getCardSize(): number {
    return this._config?.show_info === false ? 5 : 6;
  }

  /** Sections view sizing */
  public getGridOptions() {
    return { columns: 6, rows: 6, min_columns: 4, min_rows: 4 };
  }

  protected firstUpdated(): void {
    // Show the current state instantly, animate only real changes afterwards.
    requestAnimationFrame(() => (this._animate = true));
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!this._config) return false;
    if (changed.has("_config") || changed.has("_animate")) return true;
    const oldHass = changed.get("hass") as HomeAssistant | undefined;
    if (!oldHass || !this.hass) return true;
    const c = this._config;
    const watched = [
      c.entity,
      c.wind_speed_entity,
      c.wind_direction_entity,
      c.warning_entity,
      c.weather_entity,
      "sun.sun",
    ];
    return (
      watched.some((id) => id && oldHass.states[id] !== this.hass!.states[id]) ||
      oldHass.locale?.language !== this.hass.locale?.language
    );
  }

  // ---------------------------------------------------------------- actions

  private _onPointerDown(ev: PointerEvent): void {
    if (ev.button !== 0) return;
    this._held = false;
    window.clearTimeout(this._holdTimer);
    this._holdTimer = window.setTimeout(() => {
      this._held = true;
      this._runAction("hold");
    }, 500);
  }

  private _onPointerUp(): void {
    window.clearTimeout(this._holdTimer);
    if (this._held) return;
    if (this._config?.double_tap_action && this._config.double_tap_action.action !== "none") {
      if (this._tapTimer) {
        window.clearTimeout(this._tapTimer);
        this._tapTimer = undefined;
        this._runAction("double_tap");
        return;
      }
      this._tapTimer = window.setTimeout(() => {
        this._tapTimer = undefined;
        this._runAction("tap");
      }, 250);
      return;
    }
    this._runAction("tap");
  }

  private _onPointerCancel(): void {
    window.clearTimeout(this._holdTimer);
  }

  private _onKeyDown(ev: KeyboardEvent): void {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this._runAction("tap");
    }
  }

  private _runAction(kind: "tap" | "hold" | "double_tap"): void {
    if (!this.hass || !this._config) return;
    const defaults: Record<string, ActionConfig> = {
      tap: { action: "toggle" },
      hold: { action: "more-info" },
      double_tap: { action: "none" },
    };
    const action = (this._config[`${kind}_action` as const] as ActionConfig | undefined) ?? defaults[kind];
    void this._handleAction(action);
  }

  private async _handleAction(action: ActionConfig): Promise<void> {
    const hass = this.hass!;
    const entityId = action.entity || this._config!.entity;
    if (action.action === "none") return;
    if (action.confirmation) {
      const text =
        typeof action.confirmation === "object" && action.confirmation.text
          ? action.confirmation.text
          : `${action.action}?`;
      fireEvent(this, "haptic", "warning");
      if (!window.confirm(text)) return;
    }
    switch (action.action) {
      case "toggle":
        if (!entityId) return;
        fireEvent(this, "haptic", "light");
        await hass.callService("homeassistant", "toggle", { entity_id: entityId });
        break;
      case "more-info":
        if (entityId) fireEvent(this, "hass-more-info", { entityId });
        break;
      case "navigate":
        if (action.navigation_path) {
          history.pushState(null, "", action.navigation_path);
          fireEvent(window, "location-changed", { replace: false });
        }
        break;
      case "url":
        if (action.url_path) window.open(action.url_path);
        break;
      case "perform-action":
      case "call-service": {
        const name = action.perform_action || action.service;
        if (!name) return;
        const [domain, service] = name.split(".", 2);
        fireEvent(this, "haptic", "light");
        await hass.callService(domain, service, action.data ?? action.service_data, action.target);
        break;
      }
    }
  }

  // ---------------------------------------------------------------- render

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const c = this._config;
    const lang = hassLang(this.hass);

    if (!c.entity) {
      return html`<ha-card><div class="missing">${localize("missing_entity", lang)}</div></ha-card>`;
    }

    const stateObj = this.hass.states[c.entity];
    const unavailable = !stateObj || stateObj.state === "unavailable" || stateObj.state === "unknown";
    const isOn = !!stateObj && ON_STATES.has(stateObj.state);
    // animate only when the state really changed after the first paint
    const animate = this._animate && this._lastIsOn !== undefined && this._lastIsOn !== isOn;
    if (this._lastIsOn === undefined || this._lastIsOn !== isOn) {
      this._lastIsOn = isOn;
      if (animate) this._animatingUntil = Date.now() + 3500;
    }
    const keepAnimClass = animate || Date.now() < this._animatingUntil;

    const wind = readWind(this.hass, c.wind_speed_entity, c.wind_direction_entity, c.weather_entity);
    const warning = readWarning(this.hass, c.warning_entity);
    const scene = c.show_weather_effects !== false
      ? buildScene(this.hass, c.weather_entity, warning)
      : { snow: 0, rain: 0, lightning: false, fog: false, clouds: 0, night: this.hass.states["sun.sun"]?.state === "below_horizon", frost: false };

    const speed = wind.speed ?? 0;
    // horizontal push: wind FROM west (270°) pushes Santa to the right (+)
    const rel = (((wind.direction ?? 270) - (c.view_direction ?? 0)) * Math.PI) / 180;
    const windX = wind.direction === undefined ? (speed > 0 ? 0.6 : 0) : -Math.sin(rel);
    const storm = speed >= (c.storm_threshold ?? 50);

    const lean = clamp(speed * 0.28, 0, 16) * windX;
    const amp = clamp(0.8 + speed * 0.12, 0.8, 9);
    const swayDur = clamp(4.5 - speed * 0.06, 0.9, 4.5);
    const flutterDur = clamp(2.2 - speed * 0.03, 0.35, 2.2);

    const sceneClasses = [
      "scene",
      isOn ? "on" : "off",
      keepAnimClass ? "animate" : "",
      scene.night ? "night" : "",
      scene.clouds >= 2 ? "overcast" : "",
      scene.frost ? "frost" : "",
      storm ? "storm" : "",
      windX < -0.05 ? "wind-left" : "",
    ].join(" ");

    const warnColor = warning?.color || "transparent";
    const sceneStyle = [
      `--lean:${lean.toFixed(2)}deg`,
      `--amp:${amp.toFixed(2)}deg`,
      `--sway-dur:${swayDur.toFixed(2)}s`,
      `--flutter-dur:${flutterDur.toFixed(2)}s`,
      `--hat-lean:${(windX * clamp(speed * 0.4, 0, 18)).toFixed(1)}deg`,
      `--warn-color:${warnColor}`,
      `--warn-opacity:${warning && warning.level > 0 ? 0.15 + warning.level * 0.1 : 0}`,
    ].join(";");

    const name = c.name || stateObj?.attributes.friendly_name || c.entity;
    const stateText = unavailable
      ? localize("unavailable", lang)
      : localize(isOn ? "on" : "off", lang);

    return html`
      <ha-card
        tabindex="0"
        role="button"
        aria-label="${name}: ${stateText}"
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @pointerleave=${this._onPointerCancel}
        @keydown=${this._onKeyDown}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        <div class=${sceneClasses} style=${sceneStyle}>
          <div class="tint"></div>
          ${this._renderSky(scene, speed, windX)}
          <svg viewBox="0 0 240 260" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            ${ground}${shadow}
          </svg>
          <svg class="figure" viewBox="0 0 240 260" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            ${defs}${halo}${ropes}${heap}${santa}${blower}
          </svg>
          ${this._renderPrecipitation(scene, speed, windX)}
          ${c.show_name !== false || (storm && isOn)
            ? html`<div class="header">
                ${c.show_name !== false
                  ? html`<div class="title">
                      <span class="name">${name}</span>
                      <span class="state">${stateText}</span>
                    </div>`
                  : html`<span></span>`}
                ${storm && isOn ? html`<span class="storm-hint">${localize("storm_hint", lang)}</span>` : nothing}
              </div>`
            : nothing}
        </div>
        ${c.show_info !== false ? this._renderInfo(wind.speed, wind.direction, warning, lang) : nothing}
      </ha-card>
    `;
  }

  private _animatingUntil = 0;

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    // drop the "animate" class after the transition so later re-renders don't replay it
    if (this._animatingUntil > Date.now()) {
      const wait = this._animatingUntil - Date.now() + 50;
      window.clearTimeout(this._animTimer);
      this._animTimer = window.setTimeout(() => this.requestUpdate(), wait);
    }
  }

  private _animTimer?: number;

  private _renderSky(scene: Scene, speed: number, windX: number): TemplateResult {
    const rnd = seeded(7);
    const stars =
      scene.night && scene.clouds < 2
        ? Array.from({ length: 18 }, () => {
            const style = `left:${(rnd() * 100).toFixed(1)}%;top:${(rnd() * 55).toFixed(1)}%;--dur:${(2 + rnd() * 3).toFixed(1)}s;--delay:-${(rnd() * 4).toFixed(1)}s`;
            return html`<span class="star" style=${style}></span>`;
          })
        : [];
    const cloudCount = scene.clouds === 0 ? 0 : scene.clouds === 1 ? 2 : 4;
    const cloudDur = clamp(90 - speed * 1.2, 18, 90);
    const clouds = Array.from({ length: cloudCount }, (_, i) => {
      const alpha = scene.clouds >= 2 ? (scene.night ? 0.18 : 0.75) : scene.night ? 0.12 : 0.85;
      const style = `--y:${(4 + rnd() * 28).toFixed(1)}%;--w:${(70 + rnd() * 70).toFixed(0)}px;--alpha:${alpha};--dur:${(cloudDur * (0.8 + rnd() * 0.5)).toFixed(1)}s;--delay:-${((i / cloudCount) * cloudDur).toFixed(1)}s`;
      return html`<span class="cloud" style=${style}></span>`;
    });
    return html`
      <div class="layer">${stars}</div>
      <div class="layer clouds ${windX < -0.05 ? "wind-left" : ""}">${clouds}</div>
      ${scene.fog ? html`<div class="layer"><span class="fog" style="top:45%"></span><span class="fog" style="top:62%;animation-duration:31s"></span></div>` : nothing}
      ${scene.lightning ? html`<div class="layer"><span class="flash"></span></div>` : nothing}
    `;
  }

  private _renderPrecipitation(scene: Scene, speed: number, windX: number): TemplateResult {
    const rnd = seeded(42);
    const drift = clamp(windX * speed * 0.9, -70, 70); // in % of the width
    const flakes = scene.snow
      ? Array.from({ length: scene.snow >= 2 ? 70 : 32 }, () => {
          const size = 2 + rnd() * (scene.snow >= 2 ? 4 : 3);
          const dur = (scene.snow >= 2 ? 4 : 7) + rnd() * 4 - clamp(speed / 30, 0, 2);
          const style = `--x:${(rnd() * 140 - 20 - drift / 2).toFixed(1)}%;--size:${size.toFixed(1)}px;--dur:${dur.toFixed(1)}s;--delay:-${(rnd() * dur).toFixed(1)}s;--drift:${(drift + (rnd() * 10 - 5)).toFixed(1)}%;--alpha:${(0.6 + rnd() * 0.4).toFixed(2)};--rest:${(rnd() * 90).toFixed(0)}%`;
          return html`<span class="flake" style=${style}><i></i></span>`;
        })
      : [];
    const angle = clamp(-windX * speed * 0.7, -45, 45);
    const drops = scene.rain
      ? Array.from({ length: scene.rain >= 2 ? 70 : 35 }, () => {
          const dur = 0.5 + rnd() * 0.4;
          const style = `--x:${(rnd() * 140 - 20 - drift / 3).toFixed(1)}%;--dur:${dur.toFixed(2)}s;--delay:-${(rnd() * dur).toFixed(2)}s;--drift:${(drift / 3).toFixed(1)}%;--angle:${angle.toFixed(1)}deg;--rest:${(rnd() * 90).toFixed(0)}%`;
          return html`<span class="drop" style=${style}><i></i></span>`;
        })
      : [];
    const streakCount = speed < 8 ? 0 : Math.round(clamp(speed / 7, 1, 12));
    const streakDur = clamp(3.2 - speed / 30, 0.6, 3.2);
    const streaks = Array.from({ length: streakCount }, () => {
      const style = `--y:${(8 + rnd() * 80).toFixed(1)}%;--len:${(30 + rnd() * 50).toFixed(0)}px;--dur:${(streakDur * (0.8 + rnd() * 0.5)).toFixed(2)}s;--delay:-${(rnd() * streakDur * 2).toFixed(2)}s`;
      return html`<span class="streak-wrap" style=${style}><i></i></span>`;
    });
    return html`
      <div class="layer">${drops}${flakes}</div>
      <div class="layer ${windX < -0.05 ? "wind-left" : ""}">${streaks}</div>
    `;
  }

  private _renderInfo(
    speed: number | undefined,
    direction: number | undefined,
    warning: WarningInfo | undefined,
    lang: string,
  ): TemplateResult {
    const c = this._config!;
    const chips: TemplateResult[] = [];
    if (speed !== undefined || direction !== undefined) {
      const arrow =
        direction !== undefined
          ? svg`<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 L19 20 L12 16 L5 20 Z" fill="currentColor" transform="rotate(${(direction + 180) % 360} 12 12)"/></svg>`
          : nothing;
      chips.push(html`<span
        class="chip"
        title=${localize("wind", lang)}
        @pointerdown=${this._stop}
        @pointerup=${(e: Event) => this._moreInfo(e, c.wind_speed_entity || c.wind_direction_entity || c.weather_entity)}
      >
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        ${speed !== undefined ? `${Math.round(speed)} km/h` : ""}
        ${arrow}
        ${direction !== undefined ? directionLabel(direction, lang) : ""}
      </span>`);
    }
    if (c.warning_entity) {
      if (warning && warning.level > 0) {
        const dark = warning.level >= 3;
        const text = warning.headline || `${localize("warning_level", lang)} ${warning.level}`;
        chips.push(html`<span
          class="chip warning ${dark ? "dark" : ""}"
          style="--warn-color:${warning.color}"
          title=${warning.names.join(", ")}
          @pointerdown=${this._stop}
          @pointerup=${(e: Event) => this._moreInfo(e, c.warning_entity)}
        >
          <ha-icon icon="mdi:alert"></ha-icon>
          <span class="warning-text">${text}</span>
        </span>`);
      } else if (warning) {
        chips.push(html`<span
          class="chip"
          @pointerdown=${this._stop}
          @pointerup=${(e: Event) => this._moreInfo(e, c.warning_entity)}
        >
          <ha-icon icon="mdi:shield-check-outline"></ha-icon>${localize("no_warning", lang)}
        </span>`);
      }
    }
    if (chips.length === 0) return html``;
    return html`<div class="info">${chips}</div>`;
  }

  private _stop(e: Event): void {
    e.stopPropagation();
  }

  private _moreInfo(e: Event, entityId?: string): void {
    e.stopPropagation();
    window.clearTimeout(this._holdTimer);
    if (entityId) fireEvent(this, "hass-more-info", { entityId });
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
  interface HTMLElementTagNameMap {
    "inflatable-santa-card": InflatableSantaCard;
  }
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === CARD_TAG)) {
  window.customCards.push({
    type: CARD_TAG,
    name: "Inflatable Santa Card",
    description: localize("card_description", navigator.language),
    preview: true,
    documentationURL: "https://github.com/Pfillip/inflatable-santa-card",
  });
}
