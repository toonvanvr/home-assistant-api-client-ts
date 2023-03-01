import { float, int } from '../../../util/types.ts'
import { Entity, EntityOptions } from '../entity.class.ts'
import { ClimateHvacMode } from './hvac-mode.enum.ts'
import { ClimatePresetMode } from './preset-mode.enum.ts'
import { ClimateService } from './service.enum.ts'
import { ClimateStateAttributes } from './state-attributes.interface.ts'
import { ClimateSwingMode } from './swing-mode.enum.ts'

/**
 * A climate entity controls temperature, humidity, or fans,
 * such as A/C systems and humidifiers
 *
 * - [Entity](https://developers.home-assistant.io/docs/core/entity/climate/)
 * - [Services](https://www.home-assistant.io/integrations/climate)
 */
export class ClimateEntity<
  State extends Partial<ClimateStateAttributes> = ClimateStateAttributes
> extends Entity<State> {
  constructor(entityOptions: EntityOptions) {
    super(entityOptions)
  }

  // get temperatureUnit$() {
  //   return this.state$.pipe(map((state) => state?.current_temperature ?? null))
  // }

  callService(service: ClimateService, payload: unknown) {
    return super.callService('climate', service, payload)
  }

  setAuxHeat(nextState: boolean) {
    return this.callService(ClimateService.setAuxHeat, { nextState })
  }

  setHumidity(humidity: int) {
    return this.callService(ClimateService.setHumidity, { humidity })
  }

  setHvacMode(hvacMode: ClimateHvacMode) {
    return this.callService(ClimateService.setHvacMode, { hvacMode })
  }

  setPresetMode(presetMode: ClimatePresetMode) {
    return this.callService(ClimateService.setPresetMode, { presetMode })
  }

  setSwingMode(swingMode: ClimateSwingMode) {
    return this.callService(ClimateService.setSwingMode, { swingMode })
  }

  setTemperature(temperature: float) {
    return this.callService(ClimateService.setTemperature, { temperature })
  }

  toggle(enabled: boolean) {
    if (enabled) {
      return this.callService(ClimateService.turnOn, null)
    } else {
      return this.callService(ClimateService.turnOff, null)
    }
  }
}
