import sweph from 'sweph'
import { BODIES, SIGNS } from './constants'
import type { BodyName, CelestialBody, Houses } from './definitions'

export type EphemerisAdapter = {
  calculateJulianDay: (year: number, month: number, day: number, hour: number, min: number) => number
  calculateBodyPosition: (name: BodyName, julianDay: number) => CelestialBody
  calculateHouses: (julianDay: number, latitude?: number, longitude?: number) => Houses
}

export const swissephEngine: EphemerisAdapter = {
  calculateJulianDay: (year, month, day, hour, min) => sweph.utc_to_jd(year, month, day, hour, min, 0, sweph.constants.SE_GREG_CAL).data[1],

  calculateBodyPosition: (name, julday): CelestialBody => {
    const bodyIndex = Object.values(BODIES).indexOf(name)

    const [long, , , longSpeed] = sweph.calc_ut(julday, bodyIndex, sweph.constants.SEFLG_SPEED).data

    const split_deg = sweph.split_deg(long, sweph.constants.SE_SPLIT_DEG_ZODIACAL)

    const longitude = {
      degree: split_deg.degree,
      minute: split_deg.minute,
      second: split_deg.second,
      decimal: long
    }

    return {
      name,
      longitude,
      zodiacSign: Object.values(SIGNS)[split_deg.sign],
      isRetrograde: Boolean(longSpeed < 0)
    }
  },

  calculateHouses: (julday, latitude, longitude): Houses => {
    if (latitude === undefined || longitude === undefined) {
      throw new Error('Latitude and longitude are required to calculate houses.')
    }

    const { houses } = sweph.houses_ex2(julday, 0, latitude, longitude, 'P').data

    return houses.map(long => {
      const split_deg = sweph.split_deg(long, sweph.constants.SE_SPLIT_DEG_ZODIACAL)

      const longitude = {
        degree: split_deg.degree,
        minute: split_deg.minute,
        second: split_deg.second,
        decimal: long
      }
      return { longitude, zodiacSign: Object.values(SIGNS)[split_deg.sign] }
    })
  }
}
