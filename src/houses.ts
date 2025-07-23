import { LuliaState } from './state'
import { Houses } from './definitions'
import { EphemerisAdapter } from './engine'

function calculateHouses(state: LuliaState, engine: EphemerisAdapter): Houses {
  const { dateTime, latitude, longitude } = state
  const julianDay = engine.calculateJulianDay(dateTime.getUTCFullYear(), dateTime.getUTCMonth() + 1, dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getUTCMinutes())

  return engine.calculateHouses(julianDay, latitude, longitude)
}

export { calculateHouses as houses }
