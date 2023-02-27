/**
 * Home Assistant climate swing mode
 *
 * Prefer using {@link BuiltinClimateSwingMode} values
 */
export type ClimateSwingMode = BuiltinClimateSwingMode | string

/**
 * Home Assistant defined swing modes for climate devices
 *
 * - [Official Reference](https://developers.home-assistant.io/docs/core/entity/climate/#swing-modes)
 * - [Code Source](https://github.com/home-assistant/core/blob/7a5a8826875a973b7b8d0f5dcf90f6aa2eab4125/homeassistant/components/climate/const.py#L82)
 */
export enum BuiltinClimateSwingMode {
  /** The fan is not swinging */
  off = 'SWING_OFF',
  /** The fan is swinging */
  on = 'SWING_ON',
  /** The fan is swinging vertical */
  vertical = 'SWING_VERTICAL',
  /** The fan is swinging horizontal */
  horizontal = 'SWING_HORIZONTAL',
  /** The fan is swinging both horizontal and vertical */
  both = 'SWING_BOTH',
}
