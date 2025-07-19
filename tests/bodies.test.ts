import { describe, it, expect } from 'vitest'
import Lulia from '../src'
import { HousePositions, BodyPositon } from '../src/definitions'

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

  const initialConfig = {
    date: new Date('2025-01-19T12:00:00'),
    longitude: 123.45,
    latitude: 45.67
  }

  it(`should calculate correct sign for all bodies on 2025-01-19 at 12:00 UT/GMT`, () => {
    const bodies = Lulia(initialConfig).calculateBodies()

    Object.keys(REFERENCE_DATA).forEach(body => {
      expect(bodies[body].sign).toBe(REFERENCE_DATA[body])
    })
  })

  it('should support a custom engine adapter', () => {
    const mockEphemerisAdapter = {
      calculateJulianDay: () => 123,
      calculateBodyPosition: (): BodyPositon => ({
        sign: 'libra',
        retrograde: true,
        position: {
          degree: 0,
          minute: 0,
          second: 0,
          longitude: 0
        }
      }),
      calculateHouses: (): HousePositions => ({
        1: {
          position: { degree: 0, minute: 0, second: 0, longitude: 0 },
          sign: 'taurus'
        }
      })
    }

    const initialConfig = {
      date: new Date(),
      longitude: 123.45,
      latitude: 45.67
    }

    const lulia = Lulia(initialConfig, mockEphemerisAdapter)

    const bodyPositions = lulia.calculateBodies()
    const housePositions = lulia.calculateHouses()

    expect(bodyPositions['sun'].sign).toBe('libra')
    expect(housePositions[1].sign).toBe('taurus')
  })
})
