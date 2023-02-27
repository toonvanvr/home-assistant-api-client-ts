import { float, int } from '../../util/types.ts'
import { ClimateHvacMode } from './climate/hvac-mode.enum.ts'
import { ClimatePresetMode } from './climate/preset-mode.enum.ts'
import { ClimateService } from './climate/service.enum.ts'
import { ClimateSwingMode } from './climate/swing-mode.enum.ts'
import { Entity, EntityOptions } from './entity.ts'

/**
 * @see https://www.home-assistant.io/integrations/climate
 * @see https://developers.home-assistant.io/docs/core/entity/climate/
 */
export class ClimateEntity extends Entity {
  constructor(entityOptions: EntityOptions) {
    super(entityOptions)
  }

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

  setEnabled(enabled: boolean) {
    if (enabled) {
      return this.callService(ClimateService.turnOn, null)
    } else {
      return this.callService(ClimateService.turnOff, null)
    }
  }
}
