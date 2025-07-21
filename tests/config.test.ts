import { describe, it, expect } from 'vitest'
import Lulia from '../src'

describe('Configurations', () => {
  it('should accept valid date, longitude and latitude', () => {
    const validConfig = {
      date: new Date(),
      longitude: 123.45,
      latitude: 45.67
    }

    expect(() => {
      Lulia(validConfig)
    }).not.toThrow()
  })

  it('should accept undefined longitude and latitude', () => {
    const configWithUndefined = {
      date: new Date()
    }

    expect(() => {
      Lulia(configWithUndefined)
    }).not.toThrow()
  })

  it('should throw error when date is invalid', () => {
    const invalidConfig = {
      date: new Date('invalid'),
      longitude: 123.45,
      latitude: 45.67
    }

    expect(() => {
      Lulia(invalidConfig)
    }).toThrow()
  })

  it('should throw error when longitude is invalid', () => {
    const invalidConfig = {
      date: new Date(),
      longitude: 321,
      latitude: 45.67
    }

    expect(() => {
      Lulia(invalidConfig)
    }).toThrow()
  })

  it('should throw error when latitude is invalid', () => {
    const invalidConfig = {
      date: new Date(),
      longitude: 123.45,
      latitude: 321
    }

    expect(() => {
      Lulia(invalidConfig)
    }).toThrow()
  })
})
