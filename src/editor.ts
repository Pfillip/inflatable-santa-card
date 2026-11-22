import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { hassLang, localize, type LocalizeKey } from "./localize";
import type { HomeAssistant, InflatableSantaCardConfig } from "./types";

const SCHEMA = [
  {
    name: "entity",
    required: true,
    selector: { entity: { domain: ["switch", "input_boolean", "light"] } },
  },
  { name: "name", selector: { text: {} } },
  {
    type: "expandable",
    name: "",
    flatten: true,
    title: "section_entities",
    icon: "mdi:weather-windy",
    expanded: true,
    schema: [
      { name: "wind_speed_entity", selector: { entity: { domain: "sensor" } } },
      { name: "wind_direction_entity", selector: { entity: { domain: "sensor" } } },
      { name: "warning_entity", selector: { entity: { domain: "sensor" } } },
      { name: "weather_entity", selector: { entity: { domain: "weather" } } },
    ],
  },
  {
    type: "expandable",
    name: "",
    flatten: true,
    title: "section_check",
    icon: "mdi:balloon",
    schema: [
      {
        name: "inflated_entity",
        selector: { entity: { domain: ["binary_sensor", "sensor", "input_boolean", "switch"] } },
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "inflated_threshold", selector: { number: { min: 0, max: 5000, step: 1, mode: "box" } } },
          {
            name: "inflate_timeout",
            selector: { number: { min: 5, max: 600, step: 5, mode: "box", unit_of_measurement: "s" } },
          },
        ],
      },
    ],
  },
  {
    type: "expandable",
    name: "",
    flatten: true,
    title: "section_appearance",
    icon: "mdi:palette",
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_name", selector: { boolean: {} } },
          { name: "show_info", selector: { boolean: {} } },
          { name: "show_weather_effects", selector: { boolean: {} } },
          { name: "show_power_button", selector: { boolean: {} } },
        ],
      },
      {
        name: "storm_threshold",
        selector: { number: { min: 10, max: 150, step: 5, mode: "box", unit_of_measurement: "km/h" } },
      },
      {
        name: "view_direction",
        selector: { number: { min: 0, max: 359, step: 1, mode: "slider", unit_of_measurement: "°" } },
      },
    ],
  },
  {
    type: "expandable",
    name: "",
    flatten: true,
    title: "section_actions",
    icon: "mdi:gesture-tap",
    schema: [
      { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
      { name: "hold_action", selector: { ui_action: { default_action: "more-info" } } },
      { name: "double_tap_action", selector: { ui_action: { default_action: "none" } } },
    ],
  },
] as const;

@customElement("inflatable-santa-card-editor")
export class InflatableSantaCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: InflatableSantaCardConfig;

  public setConfig(config: InflatableSantaCardConfig): void {
    this._config = config;
  }

  connectedCallback(): void {
    super.connectedCallback();
    void this._loadHaComponents();
  }

  /** Make sure HA's lazy loaded form elements (ha-form, entity picker…) are defined. */
  private async _loadHaComponents(): Promise<void> {
    if (customElements.get("ha-form") && customElements.get("ha-entity-picker")) return;
    try {
      const helpers = await (window as any).loadCardHelpers?.();
      if (!helpers) return;
      const card = await helpers.createCardElement({ type: "entities", entities: [] });
      await card?.constructor?.getConfigElement?.();
      this.requestUpdate();
    } catch {
      /* ignore – the form will still render once HA has loaded it */
    }
  }

  private _computeLabel = (schema: { name?: string; title?: string }): string => {
    const lang = hassLang(this.hass);
    const key = (schema.name || schema.title || "") as string;
    if (!key) return "";
    return localize(`editor.${key}` as LocalizeKey, lang);
  };

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const config = { ...ev.detail.value } as Record<string, unknown>;
    // keep the YAML tidy: remove empty values
    for (const key of Object.keys(config)) {
      if (config[key] === "" || config[key] === undefined || config[key] === null) delete config[key];
    }
    this._config = config as unknown as InflatableSantaCardConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }),
    );
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    const data = {
      show_name: true,
      show_info: true,
      show_weather_effects: true,
      show_power_button: true,
      storm_threshold: 50,
      view_direction: 0,
      ...this._config,
    };
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  static styles = css`
    ha-form {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "inflatable-santa-card-editor": InflatableSantaCardEditor;
  }
}
