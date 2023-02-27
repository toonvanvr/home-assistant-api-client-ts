/**
 * Home Assistant climate preset mode
 *
 * Prefer using {@link BuiltinClimatePresetMode} values
 */
export type ClimatePresetMode = BuiltinClimatePresetMode | string

/**
 * Home Assistant defined presets for climate devices
 *
 * - [Official Reference](https://developers.home-assistant.io/docs/core/entity/climate/#presets)
 * - [Code Source](https://github.com/home-assistant/core/blob/7a5a8826875a973b7b8d0f5dcf90f6aa2eab4125/homeassistant/components/climate/const.py#L45)
 */
export enum BuiltinClimatePresetMode {
  /** Device is running an energy-saving mode */
  activity = 'ACTIVITY',
  /** Device is in away mode */
  away = 'AWAY',
  /** Device turn all valve full up */
  boost = 'BOOST',
  /** Device is in comfort mode */
  comfort = 'COMFORT',
  /** Device is in home mode */
  eco = 'ECO',
  /** Device is prepared for sleep */
  home = 'HOME',
  /** Device is reacting to activity (e.g. movement sensors) */
  sleep = 'SLEEP',
}
