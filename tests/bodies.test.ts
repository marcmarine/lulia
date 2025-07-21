import { describe, it, expect } from 'vitest'
import { Houses, CelestialBody } from '../src/definitions'
import Lulia from '../src'

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

    Object.keys(REFERENCE_DATA).forEach(name => {
      expect(bodies.find(body => body.name === name)?.zodiacSign).toBe(REFERENCE_DATA[name])
    })
  })

  it('should support a custom engine adapter', () => {
    const mockEphemerisAdapter = {
      calculateJulianDay: () => 123,
      calculateBodyPosition: (): CelestialBody => ({
        name: 'sun',
        zodiacSign: 'libra',
        isRetrograde: true,
        longitude: {
          degree: 0,
          minute: 0,
          second: 0,
          decimal: 0
        }
      }),
      calculateHouses: (): Houses => [{ longitude: { degree: 0, minute: 0, second: 0, decimal: 0 }, zodiacSign: 'taurus' }]
    }

    const initialConfig = {
      date: new Date(),
      longitude: 123.45,
      latitude: 45.67
    }

    const lulia = Lulia(initialConfig, mockEphemerisAdapter)

    const bodies = lulia.calculateBodies()
    const housePositions = lulia.calculateHouses()

    expect(bodies.find(body => body.name === 'sun')?.zodiacSign).toBe('libra')
    expect(housePositions[0].zodiacSign).toBe('taurus')
  })
})
