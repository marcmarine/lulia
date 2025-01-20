import { describe, it, expect } from 'vitest'
import Lulia from '../src'
import { PlanetName, PlanetPositon } from '../src/definitions'

describe('Planets calculations', () => {
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

  it(`should calculate correct sign for all planets on 2025-01-19 at 12:00 UT/GMT`, () => {
    const planets = Lulia(initialConfig).calculate.planets()

    Object.keys(REFERENCE_DATA).forEach(planet => {
      expect(planets[planet].sign).toBe(REFERENCE_DATA[planet])
    })
  })

  Object.keys(REFERENCE_DATA).forEach(planet => {
    it(`should calculate correct sign for ${planet} on 2025-01-19 at 12:00 UT/GMT`, () => {
      const result = Lulia(initialConfig).calculate.position(
        planet as PlanetName
      )

      expect(result.sign).toBe(REFERENCE_DATA[planet])
    })
  })

  it('should support a custom engine adapter', () => {
    const mockEphemerisAdapter = {
      calculateJulianDay: () => 123,
      calculatePlanetPosition: (): PlanetPositon => ({
        sign: 'libra',
        retrograde: true,
        position: {
          degree: 0,
          minute: 0,
          second: 0,
          longitude: 0
        }
      })
    }

    const initialConfig = {
      date: new Date(),
      longitude: 123.45,
      latitude: 45.67
    }

    const planetPosition = Lulia(
      initialConfig,
      mockEphemerisAdapter
    ).calculate.position('sun')

    expect(planetPosition.sign).toBe('libra')
  })
})
