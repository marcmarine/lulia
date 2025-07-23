import type { LuliaState } from './state'
import { BODIES } from './constants'
import type { CelestialBodies, HousePosition } from './definitions'
import { EphemerisAdapter } from './engine'
import { findHouseForLongitude } from './utils'

function calculateBodies(state: LuliaState, engine: EphemerisAdapter): CelestialBodies {
  const { dateTime, longitude, latitude } = state

  const julianDay = engine.calculateJulianDay(dateTime.getUTCFullYear(), dateTime.getUTCMonth() + 1, dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getUTCMinutes())

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
