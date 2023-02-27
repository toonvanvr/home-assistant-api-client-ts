/**
 * Supported features of a climate device, represented as a bitfield
 *
 * - [Official Reference](https://developers.home-assistant.io/docs/core/entity/climate/#supported-features)
 * - [Code Source](https://github.com/home-assistant/core/blob/7a5a8826875a973b7b8d0f5dcf90f6aa2eab4125/homeassistant/components/climate/const.py#L161)
 */
export enum ClimateSupportedFeature {
  /** The device supports a target temperature. */
  targetTemperature = 1,
  /** The device supports a ranged target temperature. Used for HVAC modes heat_cool and auto */
  targetTemperatureRange = 2,
  /** The device supports a target humidity. */
  targetHumidity = 4,
  /** The device supports fan modes. */
  fanMode = 8,
  /** The device supports presets. */
  presetMode = 16,
  /** The device supports swing modes. */
  swingMode = 32,
  /** The device supports auxiliary heaters. */
  auxHeat = 64,
}
