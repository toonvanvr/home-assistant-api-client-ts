/**
 * Device class for binary sensors
 *
 * - [Official Reference](https://developers.home-assistant.io/docs/core/entity/binary-sensor/#available-device-classes)
 * - [Code Source](https://github.com/home-assistant/core/blob/7b3cab1bfe309f9c89913805aa7d82a7ac752217/homeassistant/components/binary_sensor/__init__.py#L31)
 */
export enum BinarySensorDeviceClass {
  /** On means low, Off means normal */
  battery = 'battery',
  /** On means charging, Off means not charging */
  batteryCharging = 'battery_charging',
  /** On means carbon monoxide detected, Off means no carbon monoxide (clear) */
  co = 'carbon_monoxide',
  /** On means cold, Off means normal */
  cold = 'cold',
  /** On means connected, Off means disconnected */
  connectivity = 'connectivity',
  /** On means open, Off means closed */
  door = 'door',
  /** On means open, Off means closed */
  garageDoor = 'garage_door',
  /** On means gas detected, Off means no gas (clear) */
  gas = 'gas',
  /** On means hot, Off means normal */
  heat = 'heat',
  /** On means light detected, Off means no light */
  light = 'light',
  /** On means open (unlocked), Off means closed (locked) */
  lock = 'lock',
  /** On means wet, Off means dry */
  moisture = 'moisture',
  /** On means motion detected, Off means no motion (clear) */
  motion = 'motion',
  /** On means moving, Off means not moving (stopped) */
  moving = 'moving',
  /** On means occupied, Off means not occupied (clear) */
  occupancy = 'occupancy',
  /** On means open, Off means closed */
  opening = 'opening',
  /** On means plugged in, Off means unplugged */
  plug = 'plug',
  /** On means power detected, Off means no power */
  power = 'power',
  /** On means home, Off means away */
  presence = 'presence',
  /** On means problem detected, Off means no problem (OK) */
  problem = 'problem',
  /** On means running, Off means not running */
  running = 'running',
  /** On means unsafe, Off means safe */
  safety = 'safety',
  /** On means smoke detected, Off means no smoke (clear) */
  smoke = 'smoke',
  /** On means sound detected, Off means no sound (clear) */
  sound = 'sound',
  /** On means tampering detected, Off means no tampering (clear) */
  tamper = 'tamper',
  /** On means update available, Off means up-to-date */
  update = 'update',
  /** On means vibration detected, Off means no vibration */
  vibration = 'vibration',
  /** On means open, Off means closed */
  window = 'window',
}
