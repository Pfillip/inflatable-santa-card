export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language?: string;
  locale?: { language: string };
  callService: (
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ) => Promise<unknown>;
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
}

export interface ActionConfig {
  action:
    | "toggle"
    | "more-info"
    | "navigate"
    | "url"
    | "perform-action"
    | "call-service"
    | "none";
  entity?: string;
  navigation_path?: string;
  url_path?: string;
  perform_action?: string;
  service?: string;
  data?: Record<string, unknown>;
  service_data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  confirmation?: boolean | { text?: string };
}

export interface InflatableSantaCardConfig {
  type: string;
  entity: string;
  name?: string;
  wind_speed_entity?: string;
  wind_direction_entity?: string;
  warning_entity?: string;
  weather_entity?: string;
  view_direction?: number;
  storm_threshold?: number;
  show_name?: boolean;
  show_info?: boolean;
  show_weather_effects?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface Scene {
  snow: number; // 0 = none, 1 = light, 2 = heavy
  rain: number; // 0 = none, 1 = rain, 2 = pouring
  lightning: boolean;
  fog: boolean;
  clouds: number; // 0..2
  night: boolean;
  frost: boolean;
}

export interface WarningInfo {
  level: number;
  count: number;
  headline?: string;
  names: string[];
  color: string;
}
