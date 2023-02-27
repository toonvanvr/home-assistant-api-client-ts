import { float, int } from '../../../util/types.ts'
import { UnitOfTemperature } from '../unit-of-temperature.enum.ts'
import { ClimateFanMode } from './fan-mode.enum.ts'
import { ClimateHvacAction } from './hvac-action.enum.ts'
import { ClimateHvacMode } from './hvac-mode.enum.ts'
import { ClimatePresetMode } from './preset-mode.enum.ts'
import { ClimateSwingMode } from './swing-mode.enum.ts'

/**
 * Home Assistant Climate Properties
 *
 * - [Official Reference](https://developers.home-assistant.io/docs/core/entity/climate/#properties)
 * - [Code Source](https://github.com/home-assistant/core/blob/7a5a8826875a973b7b8d0f5dcf90f6aa2eab4125/homeassistant/components/climate/const.py)
 *
 * Docstrings on the properties are copied from the official reference and slightly adapted for this library.
 */
export interface ClimateProperties {
  /**
   * The unit of temperature measurement for the system
   *
   * default: not implemented
   */
  temperature_unit: UnitOfTemperature
  /**
   * The precision of the temperature in the system.
   *
   * default: 0.1 for Celcius, 1 for others
   */
  precision: float
  /**
   * The current temperature
   *
   * default: null
   */
  current_temperature: float
  /**
   * The current humidity
   *
   * default: null
   */
  current_humidity: int
  /**
   * The temperature currently set to be reached
   *
   * default: null
   */
  target_temperature: float
  /**
   * The upper bound target temperature
   *
   * default: null
   */
  target_temperature_high: float
  /**
   * The lower bound target temperature
   *
   * default: null
   */
  target_temperature_low: float
  /**
   * The supported step size a target temperature can be increased/decreased
   *
   * default: null
   */
  target_temperature_step: float
  /**
   * The target humidity the device is trying to reach
   *
   * default: null
   *
   * Requires SUPPORT_TARGET_HUMIDITY
   */
  target_humidity: float
  /**
   * Returns the maximum temperature
   *
   * default: 35
   */
  max_temp: float
  /**
   * Returns the minimum temperature
   *
   * default: 7
   */
  min_temp: float
  /**
   * Returns the maximum humidity
   *
   * default: 99
   *
   * Requires SUPPORT_TARGET_HUMIDITY
   */
  max_humidity: int
  /**
   * Returns the minimum humidity
   *
   * default: 30
   *
   * Requires SUPPORT_TARGET_HUMIDITY
   */
  min_humidity: int
  /**
   * The current operation (e.g. heat, cool, idle). Used to determine state
   *
   * default: not implemented
   */
  hvac_mode: ClimateHvacMode
  /** The current HVAC action
   *
   * default: null
   */
  hvac_action: ClimateHvacAction
  /**
   * List of available operation modes.
   *
   * default: not implemented
   */
  hvac_modes: ClimateHvacMode[]
  /**
   * The current active preset
   *
   * default: not implemented
   *
   * Requires SUPPORT_PRESET_MODE
   */
  // TODO: add typing through generics?
  preset_mode: ClimatePresetMode
  /**
   * The available presets
   *
   * default: not implemented
   *
   * Requires SUPPORT_PRESET_MODE
   */
  preset_modes: ClimatePresetMode[]
  /**
   * Returns the current fan mode
   *
   * default: not implemented
   *
   * Requires SUPPORT_FAN_MODE
   */
  // TODO: does this have typing?
  fan_mode: ClimateFanMode
  /**
   * Returns the list of available fan modes
   *
   * default: not implemented
   *
   * Requires SUPPORT_FAN_MODE
   */
  fan_modes: ClimateFanMode[]
  /**
   * Returns the swing setting
   *
   * default: not implemented
   *
   * Requires SUPPORT_SWING_MODE
   */
  // TODO: does this have typing?
  swing_mode: ClimateSwingMode
  /**
   * Returns the list of available swing modes
   *
   * default: not implemented
   *
   * Requires SUPPORT_SWING_MODE
   */
  swing_modes: ClimateSwingMode[]
  /** Returns True if an auxiliary heater is on
   *
   * default: null
   *
   * Requires SUPPORT_AUX_HEAT
   */

  is_aux_heat: boolean
  /**
   * Bitmap of supported features
   *
   * default: not implemented
   *
   * [ClimateSupportedFeature](./supported-feature.enum.ts)
   */
  supported_features: int
}
