import type { LuliaConfig } from './config'
import { PLANETS } from './constants'
import { PlanetName, PlanetPositon } from './definitions'
import { EphemerisAdapter } from './engine'

function getJulianDay(date: Date, engine: EphemerisAdapter): number {
  return engine.calculateJulianDay(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours()
  )
}

export function calculatePlanet(
  planet: PlanetName,
  config: LuliaConfig,
  engine: EphemerisAdapter
): PlanetPositon {
  const julianDay = getJulianDay(config.date, engine)
  return engine.calculatePlanetPosition(planet, julianDay)
}

export function calculatePlanets(
  config: LuliaConfig,
  engine: EphemerisAdapter
): Record<PlanetName, PlanetPositon> {
  const julianDay = getJulianDay(config.date, engine)
  return Object.entries(PLANETS).reduce((acc, [, planet]) => {
    return {
      ...acc,
      [planet]: engine.calculatePlanetPosition(planet, julianDay)
    }
  }, {} as Record<PlanetName, PlanetPositon>)
}
