import type { LuliaState } from './state'
import { BODIES } from './constants'
import type { Planet, HouseNumber } from './definitions'
import { EphemerisAdapter } from './engine'
import { findHouseForLongitude } from './utils'

export function calculateBodies(state: LuliaState, engine: EphemerisAdapter): Planet[] {
  const { dateTime, longitude, latitude } = state

  const julianDay = engine.calculateJulianDay(dateTime.getUTCFullYear(), dateTime.getUTCMonth() + 1, dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getUTCMinutes())

  return Object.values(BODIES).map(name => {
    const celestialBody = engine.calculateBodyPosition(name, julianDay)

    let result = { ...celestialBody }

    if (longitude && latitude) {
      const houseCusps = engine.calculateHouses(julianDay, longitude, latitude)
      const assignedHouse = findHouseForLongitude(houseCusps, celestialBody.position.decimal)

      result = { ...result, house: assignedHouse as HouseNumber }
    }

    return result
  })
}
