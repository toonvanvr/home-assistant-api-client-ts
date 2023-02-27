/**
 * Home Assistant Temperature Unit
 *
 * - [Documentation](https://developers.home-assistant.io/docs/core/entity/climate/#properties)
 * - [Implementation](https://github.com/home-assistant/core/blob/73c7ee4326ba51a8ba92bd951993d6ab20f03402/homeassistant/const.py#L570)
 */
export enum UnitOfTemperature {
  /**
   * Degrees Celcius
   *
   * Metric unit of temperature.
   *
   * - Absolute zero: -273.15 °C
   * - Freezing point of water: 0 °C
   * - Boiling point of water: 100 °C
   */
  celcius = '°C',
  /**
   * Degrees Fahrenheit
   *
   * Imperial unit of temperature.
   *
   * - Absolute zero: -459.67 °F
   * - Freezing point of water: 32 °F
   * - Boiling point of water: 212 °F
   */
  fahrenheit = '°F',
  /**
   * Degrees Kelvin
   *
   * Scientific unit of temperature.
   * Scale used by the International System of Units (SI).
   *
   * - Absolute zero: 0 K
   * - Freezing point of water: 273.15 K
   * - Boiling point of water: 373.15 K
   */
  kelvin = 'K',
}
