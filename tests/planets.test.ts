import { describe, it, expect } from 'vitest'
import { House, HouseNumber, Planet } from '../src/definitions'
import Lulia from '../src'
import { SIGNS } from '../src/constants'
import { getLocaleISODateString } from '../src/utils'

describe('Planet calculations', () => {
  const REFERENCE_DATA = {
    sun: 'taurus',
    moon: 'aries',
    mercury: 'aries',
    venus: 'gemini',
    mars: 'cancer',
    jupiter: 'aquarius',
    saturn: 'capricorn',
    uranus: 'scorpio',
    neptune: 'taurus',
    pluto: 'virgo'
  }

  // Initial state representing the birth data of Immanuel Kant
  const initialState = {
    dateTime: '1724-04-22T03:38:00',
    longitude: 20.5000,
    latitude: 54.7167
  }

  it(`should calculate correct sign for all bodies on 1724-04-22 at 3:38 UT/GMT`, () => {
    const planets = Lulia(initialState).calculatePlanets()

    Object.keys(REFERENCE_DATA).forEach(name => {
      expect(planets.find(planet => planet.name === name)?.sign).toBe(REFERENCE_DATA[name])
    })
  })

  it('should support a custom engine adapter', () => {
    type NewType = House[]

    const mockEphemerisAdapter = {
      calculateJulianDay: () => 123,
      calculatePlanetPosition: (): Planet => ({
        name: 'sun',
        sign: 'libra',
        motion: 'direct',
        position: {
          degree: 0,
          minute: 0,
          second: 0,
          decimal: 0
        }
      }),
      calculateHouses: (): NewType => [...Array(12).keys()].map(index => ({ number: index as HouseNumber, position: { degree: 0, minute: 0, second: 0, decimal: 0 }, sign: Object.values(SIGNS)[index] }))
    }

    const initialState = {
      dateTime: getLocaleISODateString(),
      longitude: 123.45,
      latitude: 45.67
    }

    const lulia = Lulia(initialState, mockEphemerisAdapter)

    const planets = lulia.calculatePlanets()
    const housePositions = lulia.calculateHouses()

    expect(planets.find(planet => planet.name === 'sun')?.sign).toBe('libra')
    expect(housePositions[1].sign).toBe('taurus')
  })

  it('should assign correct house positions to planets when coordinates are provided', () => {
    const expectedHousePositions = [12, 12, 12, 2, 4, 11, 9, 6, 1, 6]
    const planets = Lulia(initialState).calculatePlanets()

    planets.forEach((planet, index) => {
      expect(planet.house).toBeDefined()
      expect(typeof planet.house).toBe('number')
      expect(planet.house).toEqual(expectedHousePositions[index])
    })
  })

  it('should not assign house positions when coordinates are missing', () => {
    const stateWithoutCoords = {
      dateTime: '2025-01-19T12:00:00',
      longitude: undefined,
      latitude: undefined
    }

    const planets = Lulia(stateWithoutCoords).calculatePlanets()

    planets.forEach(planet => {
      expect(planet.house).toBeUndefined()
    })
  })
})
