import swisseph from 'swisseph'
import { PLANETS, SIGNS } from './constants'
import { PlanetName, PlanetPositon } from './definitions'

export type EphemerisAdapter = {
  calculateJulianDay: (
    year: number,
    month: number,
    day: number,
    hour: number
  ) => number
  calculatePlanetPosition: (
    planet: PlanetName,
    julianDay: number
  ) => PlanetPositon
}

export const swissephEngine: EphemerisAdapter = {
  calculateJulianDay: (year, month, day, hour) =>
    swisseph.swe_julday(year, month, day, hour, swisseph.SE_GREG_CAL),

  calculatePlanetPosition: (planet, julday) => {
    const planetIndex = Object.values(PLANETS).indexOf(planet)

    const { longitude, distanceSpeed } = swisseph.swe_calc_ut(
      julday,
      planetIndex,
      swisseph.SEFLG_SPEED
    ) as {
      longitude: number
      distanceSpeed: number
    }

    const split_deg = swisseph.swe_split_deg(
      longitude,
      swisseph.SE_SPLIT_DEG_ZODIACAL
    )

    const position = {
      degree: split_deg.degree,
      minute: split_deg.min,
      second: split_deg.second,
      longitude
    }

    return {
      position,
      sign: Object.values(SIGNS)[split_deg.sign],
      retrograde: Boolean(distanceSpeed < 0)
    }
  }
}
