import type { LuliaConfig } from './config'
import { BODIES } from './constants'
import type { CelestialBodies, HousePosition } from './definitions'
import { EphemerisAdapter } from './engine'
import { findHouseForLongitude } from './utils'

function calculateBodies(config: LuliaConfig, engine: EphemerisAdapter): CelestialBodies {
  const { date, longitude, latitude } = config

  const julianDay = engine.calculateJulianDay(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes())

  return Object.values(BODIES).map(name => {
    const celestialBody = engine.calculateBodyPosition(name, julianDay)

    let result = { ...celestialBody }

    if (longitude && latitude) {
      const houseCusps = engine.calculateHouses(julianDay, longitude, latitude)
      const assignedHouse = findHouseForLongitude(houseCusps, celestialBody.longitude.decimal)

      result = { ...result, housePosition: assignedHouse as HousePosition }
    }

    return result
  })
}

export { calculateBodies as bodies }
