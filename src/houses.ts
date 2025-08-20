import { LuliaState } from './state'
import { House } from './definitions'
import { EphemerisAdapter } from './engine'
import { parseLocaleISODateString } from './utils'

export function calculateHouses(state: LuliaState, engine: EphemerisAdapter): House[] {
  const { dateTime, latitude, longitude } = state
  const parsedDate = parseLocaleISODateString(dateTime)
  const julianDay = engine.calculateJulianDay(...parsedDate)

  return engine.calculateHouses(julianDay, latitude, longitude)
}
