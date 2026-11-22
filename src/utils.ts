import type { HassEntity, HomeAssistant, Scene, WarningInfo } from "./types";

export const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v));

const isUnavailable = (s?: HassEntity): boolean =>
  !s || s.state === "unavailable" || s.state === "unknown" || s.state === "";

const POINTS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

/**
 * Parse a wind direction ("from" direction) into degrees.
 * Accepts numbers ("270", "270.5") and compass points in English or German
 * ("WSW", "NO", "Nordwest", "south-east" ...).
 */
export function parseDirection(raw: unknown): number | undefined {
  if (raw === null || raw === undefined) return undefined;
  if (typeof raw === "number") return Number.isFinite(raw) ? ((raw % 360) + 360) % 360 : undefined;
  const str = String(raw).trim();
  if (str === "" || str === "unknown" || str === "unavailable") return undefined;
  const num = Number(str.replace(",", ".").replace("°", ""));
  if (Number.isFinite(num)) return ((num % 360) + 360) % 360;

  let s = str.toLowerCase();
  s = s
    .replace(/nord|north/g, "n")
    .replace(/süd|sued|south/g, "s")
    .replace(/ost|east/g, "e")
    .replace(/west/g, "w")
    .replace(/[^a-z]/g, "")
    .toUpperCase()
    // German abbreviations use "O" (Ost) instead of "E"
    .replace(/O/g, "E");
  const idx = POINTS.indexOf(s);
  return idx >= 0 ? idx * 22.5 : undefined;
}

export function directionLabel(deg: number, lang: string): string {
  const idx = Math.round(deg / 22.5) % 16;
  const p = POINTS[idx];
  return lang.startsWith("de") ? p.replace(/E/g, "O") : p;
}

/** Convert a wind speed to km/h based on its unit. */
export function toKmh(value: number, unit?: string): number {
  const u = (unit || "km/h").toLowerCase().replace(/\s/g, "");
  switch (u) {
    case "m/s":
      return value * 3.6;
    case "mph":
      return value * 1.609344;
    case "kn":
    case "kt":
    case "knots":
      return value * 1.852;
    case "ft/s":
      return value * 1.09728;
    default:
      return value;
  }
}

export interface WindInfo {
  speed?: number; // km/h
  direction?: number; // degrees, wind coming FROM
}

export function readWind(
  hass: HomeAssistant,
  speedEntity?: string,
  directionEntity?: string,
  weatherEntity?: string,
): WindInfo {
  const info: WindInfo = {};
  const sp = speedEntity ? hass.states[speedEntity] : undefined;
  if (sp && !isUnavailable(sp)) {
    const v = Number(String(sp.state).replace(",", "."));
    if (Number.isFinite(v)) info.speed = toKmh(v, sp.attributes.unit_of_measurement);
  }
  const dir = directionEntity ? hass.states[directionEntity] : undefined;
  if (dir && !isUnavailable(dir)) info.direction = parseDirection(dir.state);

  // Fall back to the weather entity's attributes
  const w = weatherEntity ? hass.states[weatherEntity] : undefined;
  if (w && !isUnavailable(w)) {
    if (info.speed === undefined && w.attributes.wind_speed !== undefined) {
      const v = Number(w.attributes.wind_speed);
      if (Number.isFinite(v)) info.speed = toKmh(v, w.attributes.wind_speed_unit);
    }
    if (info.direction === undefined && w.attributes.wind_bearing !== undefined) {
      info.direction = parseDirection(w.attributes.wind_bearing);
    }
  }
  return info;
}

export const WARNING_COLORS = ["", "#f6c12d", "#fb8c00", "#e53935", "#8e24aa"];

/**
 * Reads a DWD "current warning level" sensor (integration "dwd_weather_warnings").
 * State: 0..4, attributes warning_count, warning_<n>_name, _level, _headline, _color.
 */
export function readWarning(hass: HomeAssistant, entity?: string): WarningInfo | undefined {
  const s = entity ? hass.states[entity] : undefined;
  if (!s || isUnavailable(s)) return undefined;
  const level = clamp(Math.round(Number(s.state)) || 0, 0, 4);
  const count = Number(s.attributes.warning_count) || 0;
  const names: string[] = [];
  let headline: string | undefined;
  let color: string | undefined;
  let best = -1;
  for (let i = 1; i <= Math.max(count, 0); i++) {
    const name = s.attributes[`warning_${i}_name`];
    if (name) names.push(String(name));
    const lvl = Number(s.attributes[`warning_${i}_level`]) || 0;
    if (lvl > best) {
      best = lvl;
      headline = s.attributes[`warning_${i}_headline`] || name;
      color = s.attributes[`warning_${i}_color`];
    }
  }
  return { level, count, headline, names, color: color || WARNING_COLORS[level] || "" };
}

const has = (names: string[], ...words: string[]): boolean =>
  names.some((n) => words.some((w) => n.toLowerCase().includes(w)));

export function buildScene(
  hass: HomeAssistant,
  weatherEntity: string | undefined,
  warning: WarningInfo | undefined,
): Scene {
  const scene: Scene = {
    snow: 0,
    rain: 0,
    lightning: false,
    fog: false,
    clouds: 0,
    night: false,
    frost: false,
  };

  const sun = hass.states["sun.sun"];
  if (sun) scene.night = sun.state === "below_horizon";

  const w = weatherEntity ? hass.states[weatherEntity] : undefined;
  if (w && !isUnavailable(w)) {
    switch (w.state) {
      case "clear-night":
        scene.night = true;
        break;
      case "cloudy":
        scene.clouds = 2;
        break;
      case "partlycloudy":
        scene.clouds = 1;
        break;
      case "fog":
        scene.fog = true;
        scene.clouds = 1;
        break;
      case "rainy":
        scene.rain = 1;
        scene.clouds = 2;
        break;
      case "pouring":
      case "hail":
        scene.rain = 2;
        scene.clouds = 2;
        break;
      case "snowy":
        scene.snow = 1;
        scene.clouds = 1;
        break;
      case "snowy-rainy":
        scene.snow = 1;
        scene.rain = 1;
        scene.clouds = 2;
        break;
      case "lightning":
        scene.lightning = true;
        scene.clouds = 2;
        break;
      case "lightning-rainy":
        scene.lightning = true;
        scene.rain = 2;
        scene.clouds = 2;
        break;
      case "windy":
      case "windy-variant":
        scene.clouds = Math.max(scene.clouds, 1);
        break;
    }
    const t = Number(w.attributes.temperature);
    if (Number.isFinite(t) && t <= 0) scene.frost = true;
  }

  // DWD warnings intensify the scene
  if (warning && warning.level > 0) {
    const n = warning.names;
    if (has(n, "schnee", "snow", "schneeverwehung")) scene.snow = Math.max(scene.snow, warning.level >= 2 ? 2 : 1);
    if (has(n, "gewitter", "thunder")) {
      scene.lightning = true;
      scene.clouds = 2;
    }
    if (has(n, "regen", "rain", "dauerregen", "starkregen")) scene.rain = Math.max(scene.rain, warning.level >= 2 ? 2 : 1);
    if (has(n, "nebel", "fog")) scene.fog = true;
    if (has(n, "frost", "glätte", "glatteis", "glaette", "ice")) scene.frost = true;
    scene.clouds = Math.max(scene.clouds, warning.level >= 2 ? 2 : 1);
  }
  return scene;
}

/** Small deterministic pseudo random generator so particles don't jump on re-render. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
