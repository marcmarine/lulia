import type { LuliaConfig } from './config'
import { BODIES } from './constants'
import { BodyName, BodyPositon } from './definitions'
import { EphemerisAdapter } from './engine'

function calculateBodies(config: LuliaConfig, engine: EphemerisAdapter): Record<BodyName, BodyPositon> {
  const { date } = config
  const julianDay = engine.calculateJulianDay(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours())
  return Object.entries(BODIES).reduce((acc, [, body]) => {
    return {
      ...acc,
      [body]: engine.calculateBodyPosition(body, julianDay)
    }
  }, {} as Record<BodyName, BodyPositon>)
}

export { calculateBodies as bodies }
