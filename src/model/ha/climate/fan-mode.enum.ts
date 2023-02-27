/**
 * Home Assistant climate fan mode
 *
 * Prefer using {@link BuiltinClimateFanMode} values
 */
export type ClimateFanMode = BuiltinClimateFanMode | string

/**
 * Home Assistant defined fan modes for climate devices
 *
 * - [Official Reference](https://developers.home-assistant.io/docs/core/entity/climate/#fan-modes)
 * - [Code Source](https://github.com/home-assistant/core/blob/7a5a8826875a973b7b8d0f5dcf90f6aa2eab4125/homeassistant/components/climate/const.py#L69)
 */
export enum BuiltinClimateFanMode {
  auto = 'FAN_AUTO',
  diffuse = 'FAN_DIFFUSE',
  focus = 'FAN_FOCUS',
  high = 'FAN_HIGH',
  low = 'FAN_LOW',
  medium = 'FAN_MEDIUM',
  middle = 'FAN_MIDDLE',
  off = 'FAN_OFF',
  on = 'FAN_ON',
}
