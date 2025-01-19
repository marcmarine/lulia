import type { LuliaConfig } from './config'
import { PLANETS, SIGNS } from './constants'
import { PlanetName, PlanetPositon } from './definitions'
import { EphemerisAdapter } from './engine'

export function calculatePlanets(
  config: LuliaConfig,
  engine: EphemerisAdapter
): Record<PlanetName, PlanetPositon> {
  const { date } = config

  const julianday = engine.calculateJulianDay(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours()
  )

  return Object.entries(PLANETS).reduce((acc, [, planet]) => {
    const { sign, ...rest } = engine.calculatePlanetPosition(planet, julianday)

    return {
      ...acc,
      [planet]: {
        ...rest,
        sign: Object.values(SIGNS)[sign]
      }
    }
  }, {} as Record<PlanetName, PlanetPositon>)
}
