import { LitElement, html, nothing, svg, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
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

const CARD_VERSION = "1.2.0";
const CARD_TAG = "inflatable-santa-card";

console.info(
  `%c INFLATABLE-SANTA-CARD %c v${CARD_VERSION} `,
  "color:#fff;background:#d81f26;font-weight:700;border-radius:3px 0 0 3px",
  "color:#d81f26;background:#fff;font-weight:700;border-radius:0 3px 3px 0",
);

const ON_STATES = new Set(["on", "open", "playing", "home"]);

// Register custom properties so that wind and warning changes transition smoothly.
(() => {
  const reg = (name: string, syntax: string, initialValue: string) => {
    try {
      (CSS as any).registerProperty?.({ name, syntax, inherits: true, initialValue });
    } catch {
      /* already registered */
    }
  };
  reg("--lean", "<angle>", "0deg");
  reg("--amp", "<angle>", "1deg");
  reg("--hat-lean", "<angle>", "0deg");
  reg("--warn-color", "<color>", "transparent");
})();

const POWER_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.56 5.44l-1.45 1.45A5.97 5.97 0 0 1 18 12a6 6 0 0 1-12 0c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.96 7.96 0 0 0 4 12a8 8 0 0 0 16 0c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2"/></svg>`;
const UNPLUGGED_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.84 22.73L15.31 17.2 14.5 18c-1.3 1.3-3.08 1.83-4.79 1.6l-2.68 2.67-1.41-1.41 2.67-2.68C8.06 16.47 8.6 14.7 9.89 13.4l.8-.81L1.11 3l1.28-1.27 19.73 19.73zM17.6 14.9l-1.4-1.41 1.6-1.6-1.06-1.06-1.6 1.6-1.41-1.4 1.6-1.6-1.06-1.07-1.6 1.6-1.41-1.4 2.12-2.13a5.25 5.25 0 0 1 6.44-.78l2.67-2.67 1.41 1.41-2.67 2.67c.6.98.84 2.13.71 3.24z"/></svg>`;

type Linger = { value: any; until: number };
type Visual = "on" | "half" | "off";
type Phase = "ok" | "inflating" | "leaking" | "fault_on" | "fault_off";
const TRUE_STATES = new Set(["on", "true", "open", "home", "inflated", "aufgeblasen", "yes"]);

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
  private _lastVisual?: Visual;
  private _faultTimer?: number;
  @state() private _pending = false;
  @state() private _failed = false;
  private _pendingTimer?: number;
  private _linger = new Map<string, Linger>();
  private _lingerTimer?: number;

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
      show_power_button: true,
      storm_threshold: 50,
      view_direction: 0,
      inflated_threshold: 10,
      inflate_timeout: 90,
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
    if (["_config", "_animate", "_pending", "_failed"].some((k) => changed.has(k))) return true;
    const oldHass = changed.get("hass") as HomeAssistant | undefined;
    if (!oldHass || !this.hass) return true;
    const c = this._config;
    const watched = [
      c.entity,
      c.wind_speed_entity,
      c.wind_direction_entity,
      c.warning_entity,
      c.weather_entity,
      c.inflated_entity,
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
      tap: { action: this._config.show_power_button === false ? "toggle" : "more-info" },
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

  private async _onPower(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (!this.hass || !this._config?.entity || this._pending) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj || stateObj.state === "unavailable") return;
    this._pending = true;
    this._failed = false;
    window.clearTimeout(this._pendingTimer);
    // if the plug does not report back, show a short error shake
    this._pendingTimer = window.setTimeout(() => {
      this._pending = false;
      this._failed = true;
      window.setTimeout(() => (this._failed = false), 700);
    }, 10000);
    fireEvent(this, "haptic", "light");
    try {
      await this.hass.callService("homeassistant", "toggle", { entity_id: this._config.entity });
    } catch {
      window.clearTimeout(this._pendingTimer);
      this._pending = false;
      this._failed = true;
      fireEvent(this, "haptic", "failure");
      window.setTimeout(() => (this._failed = false), 700);
    }
  }

  /** Reads the optional "really inflated" entity. undefined = no check configured / unknown. */
  private _readInflated(): boolean | undefined {
    const id = this._config?.inflated_entity;
    const st = id ? this.hass?.states[id] : undefined;
    if (!st || st.state === "unavailable" || st.state === "unknown") return undefined;
    const num = Number(String(st.state).replace(",", "."));
    if (st.state.trim() !== "" && Number.isFinite(num)) return num > (this._config?.inflated_threshold ?? 10);
    return TRUE_STATES.has(st.state.toLowerCase());
  }

  /** Combines plug state and inflation check into what Santa should look like. */
  private _visualState(isOn: boolean, changedAt?: string): { visual: Visual; phase: Phase } {
    const inflated = this._readInflated();
    if (inflated === undefined || inflated === isOn) return { visual: isOn ? "on" : "off", phase: "ok" };
    const timeout = (this._config?.inflate_timeout ?? 90) * 1000;
    const since = changedAt ? Date.now() - Date.parse(changedAt) : 0;
    const remaining = timeout - (Number.isFinite(since) ? since : 0);
    window.clearTimeout(this._faultTimer);
    if (remaining > 0) {
      this._faultTimer = window.setTimeout(() => this.requestUpdate(), remaining + 50);
      return { visual: "half", phase: isOn ? "inflating" : "leaking" };
    }
    return { visual: "half", phase: isOn ? "fault_on" : "fault_off" };
  }

  /**
   * Keeps an effect visible for a moment after it ended, so it can fade out.
   * Returns the value to render and whether it is currently leaving.
   */
  private _keep<T>(key: string, value: T): { value: T; leaving: boolean } {
    const active = !!value;
    const now = Date.now();
    if (active) {
      this._linger.set(key, { value, until: 0 });
      return { value, leaving: false };
    }
    const prev = this._linger.get(key);
    if (!prev || !this._animate) return { value, leaving: false };
    if (prev.until === 0) prev.until = now + 1600;
    if (now < prev.until) {
      window.clearTimeout(this._lingerTimer);
      this._lingerTimer = window.setTimeout(() => this.requestUpdate(), prev.until - now + 30);
      return { value: prev.value, leaving: true };
    }
    this._linger.delete(key);
    return { value, leaving: false };
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
    const { visual, phase } = unavailable
      ? { visual: "off" as Visual, phase: "ok" as Phase }
      : this._visualState(isOn, stateObj?.last_changed);
    if (this._lastIsOn !== undefined && this._lastIsOn !== isOn && this._pending) {
      window.clearTimeout(this._pendingTimer);
      this._pending = false;
    }
    this._lastIsOn = isOn;
    // "animate" marks the few seconds while Santa is filling up / collapsing
    const animate = this._animate && this._lastVisual !== undefined && this._lastVisual !== visual;
    if (this._lastVisual !== visual) {
      this._lastVisual = visual;
      if (animate) this._animatingUntil = Date.now() + 3500;
    }
    const fault = phase === "fault_on" || phase === "fault_off";
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
      `v-${visual}`,
      fault ? "fault" : "",
      this._animate ? "" : "no-anim",
      keepAnimClass ? "animate" : "",
      scene.night ? "night" : "",
      scene.clouds >= 2 ? "overcast" : "",
      scene.frost ? "frost" : "",
      storm ? "storm" : "",
      windX < -0.05 ? "wind-left" : "",
      unavailable ? "unavailable" : "",
      this._pending ? "pending" : "",
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
    const stormHint = this._keep("storm", storm && visual !== "off");
    const stateText = unavailable
      ? localize("unavailable", lang)
      : this._pending
        ? localize(isOn ? "deflating" : "inflating", lang)
        : phase !== "ok"
          ? localize(phase, lang)
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
          <div class="sky overcast-day"></div>
          <div class="sky night"></div>
          <div class="sky overcast-night"></div>
          <div class="tint"></div>
          ${this._renderSky(scene, speed, windX)}
          <svg viewBox="0 0 240 260" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            ${ground}${shadow}
          </svg>
          <svg class="figure" viewBox="0 0 240 260" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            ${defs}${halo}${ropes}${heap}${santa}${blower}
          </svg>
          ${this._renderPrecipitation(scene, speed, windX)}
          ${unavailable ? html`<div class="unplugged" title=${stateText}>${UNPLUGGED_ICON}</div>` : nothing}
          ${c.show_power_button !== false
            ? html`<button
                class="power ${this._failed ? "failed" : ""}"
                type="button"
                ?disabled=${unavailable}
                aria-pressed=${isOn ? "true" : "false"}
                aria-label="${name}: ${isOn ? localize("turn_off", lang) : localize("turn_on", lang)}"
                title=${isOn ? localize("turn_off", lang) : localize("turn_on", lang)}
                @pointerdown=${this._stop}
                @pointerup=${this._stop}
                @keydown=${this._stop}
                @click=${this._onPower}
              >
                <span class="ring"></span>${POWER_ICON}
              </button>`
            : nothing}
          ${c.show_name !== false || stormHint.value
            ? html`<div class="header">
                ${c.show_name !== false
                  ? html`<div class="title">
                      <span class="name">${name}</span>
                      <span class="state">${keyed(stateText, html`<span class="state-text">${stateText}</span>`)}</span>
                    </div>`
                  : html`<span></span>`}
                ${stormHint.value
                  ? html`<span class="storm-hint ${stormHint.leaving ? "leaving" : ""}">${localize("storm_hint", lang)}</span>`
                  : nothing}
              </div>`
            : nothing}
        </div>
        ${c.show_info !== false || fault ? this._renderInfo(wind.speed, wind.direction, warning, lang, fault) : nothing}
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
    const starsK = this._keep("stars", scene.night && scene.clouds < 2);
    const stars =
      starsK.value
        ? Array.from({ length: 18 }, () => {
            const style = `left:${(rnd() * 100).toFixed(1)}%;top:${(rnd() * 55).toFixed(1)}%;--dur:${(2 + rnd() * 3).toFixed(1)}s;--delay:-${(rnd() * 4).toFixed(1)}s`;
            return html`<span class="star" style=${style}></span>`;
          })
        : [];
    const cloudsK = this._keep("clouds", scene.clouds);
    const cloudLevel = cloudsK.value;
    const cloudCount = cloudLevel === 0 ? 0 : cloudLevel === 1 ? 2 : 4;
    const cloudDur = clamp(90 - speed * 1.2, 18, 90);
    const clouds = Array.from({ length: cloudCount }, (_, i) => {
      const alpha = cloudLevel >= 2 ? (scene.night ? 0.18 : 0.75) : scene.night ? 0.12 : 0.85;
      const style = `--y:${(4 + rnd() * 28).toFixed(1)}%;--w:${(70 + rnd() * 70).toFixed(0)}px;--alpha:${alpha};--dur:${(cloudDur * (0.8 + rnd() * 0.5)).toFixed(1)}s;--delay:-${((i / cloudCount) * cloudDur).toFixed(1)}s`;
      return html`<span class="cloud" style=${style}></span>`;
    });
    const fogK = this._keep("fog", scene.fog);
    const flashK = this._keep("lightning", scene.lightning);
    return html`
      <div class="layer">${this._fx("stars", starsK.leaving, stars)}</div>
      <div class="layer clouds ${windX < -0.05 ? "wind-left" : ""}">${this._fx(`clouds${cloudCount}`, cloudsK.leaving, clouds)}</div>
      <div class="layer">
        ${fogK.value
          ? this._fx("fog", fogK.leaving, html`<span class="fog" style="top:45%"></span><span class="fog" style="top:62%;animation-duration:31s"></span>`)
          : nothing}
      </div>
      <div class="layer">${flashK.value ? this._fx("flash", flashK.leaving, html`<span class="flash"></span>`) : nothing}</div>
    `;
  }

  /** Wraps an effect group so it fades in when it appears and out when it ends. */
  private _fx(key: string, leaving: boolean, content: unknown): unknown {
    if (Array.isArray(content) && content.length === 0) return nothing;
    return keyed(key, html`<div class="fx ${leaving ? "leaving" : ""}">${content}</div>`);
  }

  private _renderPrecipitation(scene: Scene, speed: number, windX: number): TemplateResult {
    const rnd = seeded(42);
    const drift = clamp(windX * speed * 0.9, -70, 70); // in % of the width
    const snowK = this._keep("snow", scene.snow);
    const rainK = this._keep("rain", scene.rain);
    const snow = snowK.value;
    const rain = rainK.value;
    const flakes = snow
      ? Array.from({ length: snow >= 2 ? 70 : 32 }, () => {
          const size = 2 + rnd() * (snow >= 2 ? 4 : 3);
          const dur = (snow >= 2 ? 4 : 7) + rnd() * 4 - clamp(speed / 30, 0, 2);
          const style = `--x:${(rnd() * 140 - 20 - drift / 2).toFixed(1)}%;--size:${size.toFixed(1)}px;--dur:${dur.toFixed(1)}s;--delay:-${(rnd() * dur).toFixed(1)}s;--drift:${(drift + (rnd() * 10 - 5)).toFixed(1)}%;--alpha:${(0.6 + rnd() * 0.4).toFixed(2)};--rest:${(rnd() * 90).toFixed(0)}%`;
          return html`<span class="flake" style=${style}><i></i></span>`;
        })
      : [];
    const angle = clamp(-windX * speed * 0.7, -45, 45);
    const drops = rain
      ? Array.from({ length: rain >= 2 ? 70 : 35 }, () => {
          const dur = 0.5 + rnd() * 0.4;
          const style = `--x:${(rnd() * 140 - 20 - drift / 3).toFixed(1)}%;--dur:${dur.toFixed(2)}s;--delay:-${(rnd() * dur).toFixed(2)}s;--drift:${(drift / 3).toFixed(1)}%;--angle:${angle.toFixed(1)}deg;--rest:${(rnd() * 90).toFixed(0)}%`;
          return html`<span class="drop" style=${style}><i></i></span>`;
        })
      : [];
    const streakK = this._keep("streaks", speed < 8 ? 0 : Math.round(clamp(speed / 7, 1, 12)));
    const streakCount = streakK.value;
    const streakDur = clamp(3.2 - speed / 30, 0.6, 3.2);
    const streaks = Array.from({ length: streakCount }, () => {
      const style = `--y:${(8 + rnd() * 80).toFixed(1)}%;--len:${(30 + rnd() * 50).toFixed(0)}px;--dur:${(streakDur * (0.8 + rnd() * 0.5)).toFixed(2)}s;--delay:-${(rnd() * streakDur * 2).toFixed(2)}s`;
      return html`<span class="streak-wrap" style=${style}><i></i></span>`;
    });
    return html`
      <div class="layer">
        ${this._fx(`rain${rain}`, rainK.leaving, drops)}${this._fx(`snow${snow}`, snowK.leaving, flakes)}
      </div>
      <div class="layer ${windX < -0.05 ? "wind-left" : ""}">${this._fx(`wind${streakCount}`, streakK.leaving, streaks)}</div>
    `;
  }

  private _renderInfo(
    speed: number | undefined,
    direction: number | undefined,
    warning: WarningInfo | undefined,
    lang: string,
    fault = false,
  ): TemplateResult {
    const c = this._config!;
    const chips: TemplateResult[] = [];
    if (fault) {
      chips.push(html`<span
        class="chip fault"
        role="alert"
        @pointerdown=${this._stop}
        @pointerup=${(e: Event) => this._moreInfo(e, c.inflated_entity)}
      >
        <ha-icon icon="mdi:alert-circle"></ha-icon>${localize("fault_chip", lang)}
      </span>`);
    }
    if (c.show_info === false) return html`<div class="info">${chips}</div>`;
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
          class="chip warning ${dark ? "dark severe" : ""}"
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
