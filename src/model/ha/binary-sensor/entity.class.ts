import { EntityStateDto } from '../../ws/common/entity-state.dto.ts'
import { Entity, EntityOptions } from '../entity.class.ts'
/**
 * A binary sensor is a sensor that can only have two states
 *
 * - [Entity](https://developers.home-assistant.io/docs/core/entity/climate)
 * - [Services](https://www.home-assistant.io/integrations/binary_sensor/)
 */
export class BinarySensorEntity<State = EntityStateDto> extends Entity<State> {
  constructor(entityOptions: EntityOptions) {
    super(entityOptions)
  }
}
