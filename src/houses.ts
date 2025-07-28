import { LuliaState } from './state'
import { House } from './definitions'
import { EphemerisAdapter } from './engine'

export function calculateHouses(state: LuliaState, engine: EphemerisAdapter): House[] {
  const { dateTime, latitude, longitude } = state
  const julianDay = engine.calculateJulianDay(dateTime.getUTCFullYear(), dateTime.getUTCMonth() + 1, dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getUTCMinutes())

  return engine.calculateHouses(julianDay, latitude, longitude)
}
