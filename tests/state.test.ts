import { describe, it, expect } from 'vitest'
import Lulia from '../src'

describe('State', () => {
  it('should accept valid date, longitude and latitude', () => {
    const validState = {
      dateTime: new Date(),
      longitude: 123.45,
      latitude: 45.67
    }

    expect(() => {
      Lulia(validState)
    }).not.toThrow()
  })

  it('should accept undefined longitude and latitude', () => {
    const configWithUndefined = {
      dateTime: new Date()
    }

    expect(() => {
      Lulia(configWithUndefined)
    }).not.toThrow()
  })

  it('should throw error when date is invalid', () => {
    const invalidState = {
      dateTime: new Date('invalid'),
      longitude: 123.45,
      latitude: 45.67
    }

    expect(() => {
      Lulia(invalidState)
    }).toThrow()
  })

  it('should throw error when longitude is invalid', () => {
    const invalidState = {
      dateTime: new Date(),
      longitude: 321,
      latitude: 45.67
    }

    expect(() => {
      Lulia(invalidState)
    }).toThrow()
  })

  it('should throw error when latitude is invalid', () => {
    const invalidState = {
      dateTime: new Date(),
      longitude: 123.45,
      latitude: 321
    }

    expect(() => {
      Lulia(invalidState)
    }).toThrow()
  })
})
