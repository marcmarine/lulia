import type { LuliaState } from './state'
import { PLANETS } from './constants'
import type { Planet, HouseNumber } from './definitions'
import { EphemerisAdapter } from './engine'
import { findHouseForLongitude, parseLocaleISODateString } from './utils'

export function calculatePlanets(state: LuliaState, engine: EphemerisAdapter): Planet[] {
  const { dateTime, longitude, latitude } = state
  const parsedDate = parseLocaleISODateString(dateTime)

  const julianDay = engine.calculateJulianDay(...parsedDate)

  return Object.values(PLANETS).map(name => {
    const planet = engine.calculatePlanetPosition(name, julianDay)

    let result = { ...planet }

    if (longitude && latitude) {
      const houseCusps = engine.calculateHouses(julianDay, latitude, longitude)
      const assignedHouse = findHouseForLongitude(houseCusps, planet.position.decimal)

      result = { ...result, house: assignedHouse as HouseNumber }
    }

    return result
  })
}
