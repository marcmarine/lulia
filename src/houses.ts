import { LuliaState } from './state'
import { House } from './definitions'
import { EphemerisAdapter } from './engine'
import { convertLocaleStringToUTCDate, getTimezoneFromCoordinates } from './utils'

export function calculateHouses(state: LuliaState, engine: EphemerisAdapter): House[] {
  const { dateTime, latitude, longitude } = state
  const hasCoordinates = latitude !== undefined && longitude !== undefined

  if (!hasCoordinates) {
    throw new Error('Latitude and longitude are required to calculate houses.')
  }

  const timezone = getTimezoneFromCoordinates(latitude, longitude)
  const utcDateTime = convertLocaleStringToUTCDate(dateTime, timezone)

  const julianDay = engine.calculateJulianDay(utcDateTime)


  return engine.calculateHouses(julianDay, latitude, longitude)
}
