import type { LuliaState } from './state'
import { PLANETS } from './constants'
import type { Planet, HouseNumber } from './definitions'
import { EphemerisAdapter } from './engine'
import { findHouseForLongitude } from './utils'

export function calculatePlanets(state: LuliaState, engine: EphemerisAdapter): Planet[] {
  const { dateTime, longitude, latitude } = state

  const julianDay = engine.calculateJulianDay(dateTime.getUTCFullYear(), dateTime.getUTCMonth() + 1, dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getUTCMinutes())

  return Object.values(PLANETS).map(name => {
    const planet = engine.calculatePlanetPosition(name, julianDay)

    let result = { ...planet }

    if (longitude && latitude) {
      const houseCusps = engine.calculateHouses(julianDay, longitude, latitude)
      const assignedHouse = findHouseForLongitude(houseCusps, planet.position.decimal)

      result = { ...result, house: assignedHouse as HouseNumber }
    }

    return result
  })
}
