import sweph from 'sweph'
import { BODIES, SIGNS } from './constants'
import type { PlanetName, Planet, House, HouseNumber } from './definitions'
import { convertDecimalToDegree, getSignIndexFromDegree } from './utils'

export type EphemerisAdapter = {
  calculateJulianDay: (year: number, month: number, day: number, hour: number, min: number) => number
  calculateBodyPosition: (name: PlanetName, julianDay: number) => Planet
  calculateHouses: (julianDay: number, latitude?: number, longitude?: number) => House[]
}

export const swissephEngine: EphemerisAdapter = {
  calculateJulianDay: (year, month, day, hour, minute) => {
    const hourWithMinutes = hour + minute / 60

    return sweph.julday(year, month, day, hourWithMinutes, sweph.constants.SE_GREG_CAL)
  },

  calculateBodyPosition: (name, julday): Planet => {
    const bodyIndex = Object.values(BODIES).indexOf(name)

    const [long, , , longSpeed] = sweph.calc_ut(julday, bodyIndex, sweph.constants.SEFLG_SPEED).data

    const splitDegree = convertDecimalToDegree(long)

    const position = {
      degree: splitDegree.degree,
      minute: splitDegree.minute,
      second: splitDegree.second,
      decimal: long
    }

    const signIndex = getSignIndexFromDegree(long)

    return {
      name,
      position,
      sign: Object.values(SIGNS)[signIndex],
      motion: Boolean(longSpeed < 0) ? 'retrograde' : 'direct'
    }
  },

  calculateHouses: (julday, latitude, longitude): House[] => {
    if (latitude === undefined || longitude === undefined) {
      throw new Error('Latitude and longitude are required to calculate houses.')
    }

    const { houses } = sweph.houses(julday, latitude, longitude, 'P').data

    return houses.map((longitude, index) => {
      const splitDegree = convertDecimalToDegree(longitude)

      const position = {
        degree: splitDegree.degree,
        minute: splitDegree.minute,
        second: splitDegree.second,
        decimal: longitude
      }

      const signIndex = getSignIndexFromDegree(longitude)

      return { number: index as HouseNumber, position, sign: Object.values(SIGNS)[signIndex] }
    })
  }
}
