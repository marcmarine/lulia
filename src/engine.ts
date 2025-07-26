import sweph from 'sweph'
import { BODIES, SIGNS } from './constants'
import type { BodyName, CelestialBody, Houses } from './definitions'
import { convertDecimalToDegree, getSignIndexFromDegree } from './utils'

export type EphemerisAdapter = {
  calculateJulianDay: (year: number, month: number, day: number, hour: number, min: number) => number
  calculateBodyPosition: (name: BodyName, julianDay: number) => CelestialBody
  calculateHouses: (julianDay: number, latitude?: number, longitude?: number) => Houses
}

export const swissephEngine: EphemerisAdapter = {
  calculateJulianDay: (year, month, day, hour, minute) => {
    const hourWithMinutes = hour + minute / 60

    return sweph.julday(year, month, day, hourWithMinutes, sweph.constants.SE_GREG_CAL)
  },

  calculateBodyPosition: (name, julday): CelestialBody => {
    const bodyIndex = Object.values(BODIES).indexOf(name)

    const [long, , , longSpeed] = sweph.calc_ut(julday, bodyIndex, sweph.constants.SEFLG_SPEED).data

    const splitDegree = convertDecimalToDegree(long)

    const longitude = {
      degree: splitDegree.degree,
      minute: splitDegree.minute,
      second: splitDegree.second,
      decimal: long
    }

    const signIndex = getSignIndexFromDegree(long)

    return {
      name,
      longitude,
      zodiacSign: Object.values(SIGNS)[signIndex],
      isRetrograde: Boolean(longSpeed < 0)
    }
  },

  calculateHouses: (julday, latitude, longitude): Houses => {
    if (latitude === undefined || longitude === undefined) {
      throw new Error('Latitude and longitude are required to calculate houses.')
    }

    const { houses } = sweph.houses(julday, latitude, longitude, 'P').data

    return houses.map(long => {
      const splitDegree = convertDecimalToDegree(long)

      const longitude = {
        degree: splitDegree.degree,
        minute: splitDegree.minute,
        second: splitDegree.second,
        decimal: long
      }

      const signIndex = getSignIndexFromDegree(long)

      return { longitude, zodiacSign: Object.values(SIGNS)[signIndex] }
    })
  }
}
