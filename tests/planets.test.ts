import { describe, it, expect } from 'vitest'
import Lulia from '../src'
import { PlanetPositon } from '../src/definitions'
import { PLANETS } from '../src/constants'

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

  Object.values(PLANETS).forEach(planet => {
    it(`should calculate correct sign for ${planet} on 2025-01-19 at 12:00 UT/GMT`, () => {
      const initialConfig = {
        date: new Date('2025-01-19T12:00:00'),
        longitude: 123.45,
        latitude: 45.67
      }

      const planets = Lulia(initialConfig).calculate.planets()

      Object.keys(planets).forEach(planet => {
        expect(planets[planet].sign).toBe(REFERENCE_DATA[planet])
      })
    })
  })

  it('should support a custom engine adapter', () => {
    const mockEphemerisAdapter = {
      calculateJulianDay: () => 123,
      calculatePlanetPosition: (): PlanetPositon => ({
        sign: 6,
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

    const planets = Lulia(
      initialConfig,
      mockEphemerisAdapter
    ).calculate.planets()

    expect(planets['sun'].sign).toBe('libra')
  })
})
