import type { LuliaState } from './state'
import { PLANETS } from './constants'
import type { Planet, HouseNumber } from './definitions'
import { EphemerisAdapter } from './engine'
import { convertLocaleStringToUTCDate, findHouseForLongitude, getTimezoneFromCoordinates } from './utils'

export function calculatePlanets(state: LuliaState, engine: EphemerisAdapter): Planet[] {
  const { dateTime, longitude, latitude } = state

  const hasCoordinates = latitude !== undefined && longitude !== undefined

  let utcDateTime = dateTime

  if (hasCoordinates) {
    const timezone = getTimezoneFromCoordinates(latitude, longitude)
    utcDateTime = convertLocaleStringToUTCDate(dateTime, timezone)
  }

  const julianDay = engine.calculateJulianDay(utcDateTime)

  const houseCusps = hasCoordinates
    ? engine.calculateHouses(julianDay, latitude, longitude)
    : undefined

  return Object.values(PLANETS).map(name => {
    const planet = engine.calculatePlanetPosition(name, julianDay)

    if (houseCusps) {
      const assignedHouse = findHouseForLongitude(houseCusps, planet.position.decimal)
      return { ...planet, house: assignedHouse as HouseNumber }
    }

    return { ...planet }
  })
}
