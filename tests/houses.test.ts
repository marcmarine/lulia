import { describe, it, expect } from 'vitest'
import Lulia from '../src'

describe('Houses calculations', () => {
  const expectedHouseSigns = ['libra', 'scorpio', 'sagittarius', 'aquarius', 'pisces', 'aries', 'aries', 'taurus', 'gemini', 'leo', 'virgo', 'libra']

  it('should return exactly 12 houses', () => {
    const houses = Lulia({
      date: new Date('2025-02-06T23:10:25.000Z'),
      latitude: 41.390205,
      longitude: 2.154007
    }).calculateHouses()

    expect(houses.length).toBe(12)
  })

  it('should correctly determine the zodiac signs for each astrological house based on a given date and location', () => {
    const houses = Lulia({
      date: new Date('2025-02-06T23:10:25.000Z'),
      latitude: 41.390205,
      longitude: 2.154007
    }).calculateHouses()

    expectedHouseSigns.forEach((expectedSign, index) => expect(houses[index].zodiacSign).toBe(expectedSign))
  })
})
