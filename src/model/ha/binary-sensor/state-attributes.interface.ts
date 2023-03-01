/**
 * Home Assistant Binary Sensor Properties
 *
 * - [Official Reference](https://developers.home-assistant.io/docs/core/entity/climate/#properties)
 * - [Code Source](https://github.com/home-assistant/core/blob/7a5a8826875a973b7b8d0f5dcf90f6aa2eab4125/homeassistant/components/climate/const.py)
 *
 * Docstrings on the properties are copied from the official reference and slightly adapted for this library.
 */
export interface BinarySensorStateAttributes {
  /**If the binary sensor is currently on or off */
  is_on: boolean
  /** Type of binary sensor */
  device_class: string | null
}
