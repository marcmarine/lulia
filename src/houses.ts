import { LuliaConfig } from './config'
import { Houses } from './definitions'
import { EphemerisAdapter } from './engine'

function calculateHouses(config: LuliaConfig, engine: EphemerisAdapter): Houses {
  const { date, latitude, longitude } = config
  const julianDay = engine.calculateJulianDay(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes())

  return engine.calculateHouses(julianDay, latitude, longitude)
}

export { calculateHouses as houses }
