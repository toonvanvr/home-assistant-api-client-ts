/**
 * HVAC action for climate devices
 *
 * - [Official Reference](https://developers.home-assistant.io/docs/core/entity/climate/#hvac-action)
 * - [Code Source](https://github.com/home-assistant/core/blob/7a5a8826875a973b7b8d0f5dcf90f6aa2eab4125/homeassistant/components/climate/const.py#L90)
 *
 * Home Assistant strictly limits HVAC actions to these values.
 */
export enum ClimateHvacAction {
  /** Device is cooling */
  cooling = 'cooling',
  /** Device is drying */
  drying = 'drying',
  /** Device has fan on */
  fan = 'fan',
  /** Device is heating */
  heating = 'heating',
  /** Device is idle */
  idle = 'idle',
  /** Device is turned off */
  off = 'off',
}
