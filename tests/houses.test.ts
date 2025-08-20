import { describe, it, expect } from 'vitest'
import Lulia from '../src'

describe('Houses calculations', () => {
  // Immanuel Kant, born on	22 April 1724 at 05:00 in Königsberg
  const initialState = {
    dateTime: '1724-04-22T05:00:00',
    longitude: 20.5000,
    latitude: 54.7167
  }

  const expectedHouseSigns = ['taurus', 'gemini', 'gemini', 'cancer', 'leo', 'virgo', 'scorpio', 'sagittarius', 'sagittarius', 'capricorn', 'aquarius', 'pisces']

  it('should return exactly 12 houses', () => {
    const houses = Lulia(initialState).calculateHouses()

    expect(houses.length).toBe(12)
  })

  it('should throw an error when latitude or longitude are missing', () => {
    const invalidState = {
      dateTime: '2025-02-06T23:10'
    }

    expect(() => {
      Lulia(invalidState as any).calculateHouses()
    }).toThrow('Latitude and longitude are required to calculate houses.')
  })

  it('should correctly determine the zodiac signs for each astrological house based on a given date and location', () => {
    const houses = Lulia(initialState).calculateHouses()

    expectedHouseSigns.forEach((expectedSign, index) => expect(houses[index].sign).toBe(expectedSign))
  })

  it('should have precise degrees and minutes for houses 1, 2, 3, 10, 11, 12', () => {
    const houses = Lulia(initialState).calculateHouses()

    const expectedDegrees = {
      0: { sign: 'taurus', degree: 9, minute: 28, second: 34 },
      1: { sign: 'gemini', degree: 10, minute: 13, second: 4 },
      2: { sign: 'gemini', degree: 28, minute: 8, second: 6 },
      9: { sign: 'capricorn', degree: 14, minute: 8, second: 12 },
      10: { sign: 'aquarius', degree: 3, minute: 2, second: 19 },
      11: { sign: 'pisces', degree: 3, minute: 37, second: 12}
    }

    for (const [houseIndex, expected] of Object.entries(expectedDegrees)) {
      const house = houses[Number(houseIndex)]

      expect(house.sign).toBe(expected.sign)
      expect(house.position.degree).toBe(expected.degree)
      expect(house.position.minute).toBe(expected.minute)

      if ('second' in expected) {
        expect(house.position.second).toBe(expected.second)
      }
    }
  })
})
