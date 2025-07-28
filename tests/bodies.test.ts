import { describe, it, expect } from 'vitest'
import { House, HouseNumber, Planet } from '../src/definitions'
import Lulia from '../src'
import { SIGNS } from '../src/constants'

describe('Bodies calculations', () => {
  const REFERENCE_DATA = {
    sun: 'capricorn',
    moon: 'libra',
    mercury: 'capricorn',
    venus: 'pisces',
    mars: 'cancer',
    jupiter: 'gemini',
    saturn: 'pisces',
    uranus: 'taurus',
    neptune: 'pisces',
    pluto: 'aquarius'
  }

  const initialState = {
    dateTime: new Date('2025-01-19T12:00:00'),
    longitude: 123.45,
    latitude: 45.67
  }

  it(`should calculate correct sign for all bodies on 2025-01-19 at 12:00 UT/GMT`, () => {
    const bodies = Lulia(initialState).calculateBodies()

    Object.keys(REFERENCE_DATA).forEach(name => {
      expect(bodies.find(body => body.name === name)?.sign).toBe(REFERENCE_DATA[name])
    })
  })

  it('should support a custom e…ngine adapter', () => {
    type NewType = House[]

    const mockEphemerisAdapter = {
      calculateJulianDay: () => 123,
      calculateBodyPosition: (): Planet => ({
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
      dateTime: new Date(),
      longitude: 123.45,
      latitude: 45.67
    }

    const lulia = Lulia(initialState, mockEphemerisAdapter)

    const bodies = lulia.calculateBodies()
    const housePositions = lulia.calculateHouses()

    expect(bodies.find(body => body.name === 'sun')?.sign).toBe('libra')
    expect(housePositions[1].sign).toBe('taurus')
  })
})
