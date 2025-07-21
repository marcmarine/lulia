import type { LuliaConfig } from './config'
import { BODIES } from './constants'
import type { CelestialBodies } from './definitions'
import { EphemerisAdapter } from './engine'

function calculateBodies(config: LuliaConfig, engine: EphemerisAdapter): CelestialBodies {
  const { date } = config
  const julianDay = engine.calculateJulianDay(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours())

  return Object.entries(BODIES).map(([, body]) => {
    return engine.calculateBodyPosition(body, julianDay)
  })
}
export { calculateBodies as bodies }
