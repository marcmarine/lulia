import sweph from 'sweph'
import { PLANETS, SIGNS } from './constants'
import type { PlanetName, Planet, House, HouseNumber } from './definitions'
import { convertDecimalToDegree, getZodiacPosition, parseISODateTimeString } from './utils'

export type EphemerisAdapter = {
  calculateJulianDay: (utcDateTime: string) => number
  calculatePlanetPosition: (name: PlanetName, julianDay: number) => Planet
  calculateHouses: (julianDay: number, latitude: number, longitude: number) => House[]
}

export const swissephEngine: EphemerisAdapter = {
  calculateJulianDay: (utcDateTime) => {
    const [year, month, day, hour, minute] = parseISODateTimeString(utcDateTime)

    const hourWithMinutes = hour + minute / 60

    return sweph.julday(year, month, day, hourWithMinutes, sweph.constants.SE_GREG_CAL)
  },

  calculatePlanetPosition: (name, julday): Planet => {
    const planetIndex = Object.values(PLANETS).indexOf(name)

    const [longitude, , , longSpeed] = sweph.calc_ut(julday, planetIndex, sweph.constants.SEFLG_SPEED).data

    const { degree, signIndex } = getZodiacPosition(longitude)

    const splitDegree = convertDecimalToDegree(degree)

    const position = {
      degree: splitDegree.degree,
      minute: splitDegree.minute,
      second: splitDegree.second,
      decimal: longitude
    }

    return {
      name,
      position,
      sign: Object.values(SIGNS)[signIndex],
      motion: Boolean(longSpeed < 0) ? 'retrograde' : 'direct'
    }
  },

  calculateHouses: (julday, latitude, longitude): House[] => {
    const { houses } = sweph.houses(julday, latitude, longitude, 'P').data

    return houses.map((longitude, index) => {
      const { degree, signIndex } = getZodiacPosition(longitude)

      const splitDegree = convertDecimalToDegree(degree)

      const position = {
        degree: splitDegree.degree,
        minute: splitDegree.minute,
        second: splitDegree.second,
        decimal: longitude
      }

      return { number: (index + 1) as HouseNumber, position, sign: Object.values(SIGNS)[signIndex] }
    })
  }
}
