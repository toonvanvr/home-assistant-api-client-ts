/**
 * The HVAC mode of a climate entity
 *
 * - [Official Reference](https://developers.home-assistant.io/docs/core/entity/climate/#hvac-modes)
 * - [Code Source](https://github.com/home-assistant/core/blob/7a5a8826875a973b7b8d0f5dcf90f6aa2eab4125/homeassistant/components/climate/const.py#LL8C10-L8C10)
 *
 * Home Assistant strictly limits HVAC modes to these values.
 * Other modes can be defined as preset instead.
 */
export enum ClimateHvacMode {
  /** The device is set to a schedule, learned behavior, AI */
  auto = 'auto',
  /** The device is set to cool to a target temperature */
  cool = 'cool',
  /** The device is set to dry/humidity mode */
  dry = 'dry',
  /** The device only has the fan on. No heating or cooling taking place */
  fanOnly = 'fan_only',
  /** The device is set to heat to a target temperature */
  heat = 'heat',
  /** The device is set to heat/cool to a target temperature range */
  heatCool = 'heat_cool',
  /** The device is turned off */
  off = 'off',
}
