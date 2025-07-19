import sweph from 'sweph'
import { BODIES, SIGNS } from './constants'
import { HousePositions, BodyName, BodyPositon } from './definitions'

export type EphemerisAdapter = {
  calculateJulianDay: (year: number, month: number, day: number, hour: number) => number
  calculateBodyPosition: (body: BodyName, julianDay: number) => BodyPositon
  calculateHouses: (julianDay: number, latitude: number, longitude: number) => HousePositions
}

export const swissephEngine: EphemerisAdapter = {
  calculateJulianDay: (year, month, day, hour) => sweph.julday(year, month, day, hour, sweph.constants.SE_GREG_CAL),

  calculateBodyPosition: (bodyName, julday): BodyPositon => {
    const bodyIndex = Object.values(BODIES).indexOf(bodyName)

    const [longitude, , , longitudeSpeed] = sweph.calc_ut(julday, bodyIndex, sweph.constants.SEFLG_SPEED).data

    const split_deg = sweph.split_deg(longitude, sweph.constants.SE_SPLIT_DEG_ZODIACAL)

    const position = {
      degree: split_deg.degree,
      minute: split_deg.minute,
      second: split_deg.second,
      longitude
    }

    return {
      name: bodyName,
      position,
      sign: Object.values(SIGNS)[split_deg.sign],
      retrograde: Boolean(longitudeSpeed < 0)
    }
  },

  calculateHouses: (julday, latitude, longitude): HousePositions => {
    const { houses } = sweph.houses(julday, latitude, longitude, 'P').data

    const result = houses.reduce<HousePositions>((accumulator, longitude, index) => {
      const split_deg = sweph.split_deg(longitude, sweph.constants.SE_SPLIT_DEG_ZODIACAL)

      const position = {
        degree: split_deg.degree,
        minute: split_deg.minute,
        second: split_deg.second,
        longitude
      }

      return {
        ...accumulator,
        [index + 1]: { position, sign: Object.values(SIGNS)[split_deg.sign] }
      }
    }, {})

    return result
  }
}
