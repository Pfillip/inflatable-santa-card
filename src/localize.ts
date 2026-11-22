const de = {
  on: "Aufgeblasen",
  off: "Luft raus",
  inflating: "Wird aufgeblasen …",
  deflating: "Luft wird abgelassen …",
  turn_on: "Einschalten",
  turn_off: "Ausschalten",
  unavailable: "Nicht verfügbar",
  wind: "Wind",
  no_warning: "Keine Warnung",
  warning_level: "Warnstufe",
  storm_hint: "Starker Wind – Abschalten empfohlen",
  missing_entity: "Bitte eine Schaltsteckdose (entity) auswählen.",
  entity_not_found: "Entität nicht gefunden",
  card_description: "Animierter, beleuchteter aufblasbarer Weihnachtsmann mit Wind- und Wettereffekten.",
  // editor
  "editor.entity": "Schaltsteckdose (Ein/Aus)",
  "editor.name": "Name",
  "editor.wind_speed_entity": "Windgeschwindigkeit",
  "editor.wind_direction_entity": "Windrichtung",
  "editor.warning_entity": "DWD-Warnstufe",
  "editor.weather_entity": "Wetter-Entität (optional)",
  "editor.view_direction": "Blickrichtung auf den Weihnachtsmann (°, 0 = Norden)",
  "editor.storm_threshold": "Sturmhinweis ab (km/h)",
  "editor.show_name": "Name anzeigen",
  "editor.show_info": "Infozeile anzeigen",
  "editor.show_weather_effects": "Wettereffekte anzeigen",
  "editor.show_power_button": "Ein/Aus-Button anzeigen",
  "editor.tap_action": "Aktion bei Antippen",
  "editor.hold_action": "Aktion bei langem Drücken",
  "editor.double_tap_action": "Aktion bei Doppeltippen",
  "editor.section_entities": "Wetter & Wind",
  "editor.section_appearance": "Darstellung",
  "editor.section_actions": "Interaktionen",
};

const en: typeof de = {
  on: "Inflated",
  off: "Deflated",
  inflating: "Inflating …",
  deflating: "Deflating …",
  turn_on: "Turn on",
  turn_off: "Turn off",
  unavailable: "Unavailable",
  wind: "Wind",
  no_warning: "No warning",
  warning_level: "Warning level",
  storm_hint: "Strong wind – consider switching off",
  missing_entity: "Please select a smart plug (entity).",
  entity_not_found: "Entity not found",
  card_description: "Animated, illuminated inflatable Santa with wind and weather effects.",
  "editor.entity": "Smart plug (on/off)",
  "editor.name": "Name",
  "editor.wind_speed_entity": "Wind speed",
  "editor.wind_direction_entity": "Wind direction",
  "editor.warning_entity": "DWD warning level",
  "editor.weather_entity": "Weather entity (optional)",
  "editor.view_direction": "Direction you look at Santa (°, 0 = north)",
  "editor.storm_threshold": "Storm hint from (km/h)",
  "editor.show_name": "Show name",
  "editor.show_info": "Show info row",
  "editor.show_weather_effects": "Show weather effects",
  "editor.show_power_button": "Show power button",
  "editor.tap_action": "Tap action",
  "editor.hold_action": "Hold action",
  "editor.double_tap_action": "Double tap action",
  "editor.section_entities": "Weather & wind",
  "editor.section_appearance": "Appearance",
  "editor.section_actions": "Interactions",
};

export type LocalizeKey = keyof typeof de;

export function localize(key: LocalizeKey, lang?: string): string {
  const table = (lang || "en").toLowerCase().startsWith("de") ? de : en;
  return table[key] ?? en[key] ?? key;
}

export function hassLang(hass?: { locale?: { language: string }; language?: string }): string {
  return hass?.locale?.language || hass?.language || navigator.language || "en";
}
