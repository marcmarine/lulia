import sweph from 'sweph'
import { PLANETS, SIGNS } from './constants'
import { HousePositions, PlanetName, PlanetPositon } from './definitions'

export type EphemerisAdapter = {
  calculateJulianDay: (year: number, month: number, day: number, hour: number) => number
  calculatePlanetPosition: (planet: PlanetName, julianDay: number) => PlanetPositon
  calculateHouses: (julianDay: number, latitude: number, longitude: number) => HousePositions
}

export const swissephEngine: EphemerisAdapter = {
  calculateJulianDay: (year, month, day, hour) => sweph.julday(year, month, day, hour, sweph.constants.SE_GREG_CAL),

  calculatePlanetPosition: (planet, julday) => {
    const planetIndex = Object.values(PLANETS).indexOf(planet)

    const [eclipticLongitude, , , longitudeSpeed] = sweph.calc_ut(julday, planetIndex, sweph.constants.SEFLG_SPEED).data

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
