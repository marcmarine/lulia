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

  calculateBodyPosition: (body, julday) => {
    const bodyIndex = Object.values(BODIES).indexOf(body)

    const [eclipticLongitude, , , longitudeSpeed] = sweph.calc_ut(julday, bodyIndex, sweph.constants.SEFLG_SPEED).data

    const split_deg = sweph.split_deg(eclipticLongitude, sweph.constants.SE_SPLIT_DEG_ZODIACAL)

    const position = {
      degree: split_deg.degree,
      minute: split_deg.minute,
      second: split_deg.second,
      eclipticLongitude
    }

    return {
      position,
      sign: Object.values(SIGNS)[split_deg.sign],
      retrograde: Boolean(longitudeSpeed < 0)
    }
  },

  calculateHouses: (julday, latitude, longitude) => {
    const { houses } = sweph.houses(julday, latitude, longitude, 'P').data

    return houses.reduce((accumulator, eclipticLongitude, index) => {
      const split_deg = sweph.split_deg(eclipticLongitude, sweph.constants.SE_SPLIT_DEG_ZODIACAL)

      const position = {
        degree: split_deg.degree,
        minute: split_deg.minute,
        second: split_deg.second,
        eclipticLongitude
      }

      return {
        ...accumulator,
        [index + 1]: { position, sign: Object.values(SIGNS)[split_deg.sign] }
      }
    }, {})
  }
}
