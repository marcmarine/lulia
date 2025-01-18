import { describe, it, expect } from 'vitest'
import Lulia from '../src'

describe('Lulia', () => {
  it('should return initial configuration', () => {
    const initialConfig = {
      date: new Date(),
      longitude: 123.45,
      latitude: 45.67
    }

    const config = Lulia(initialConfig).getConfig()

    expect(config).toStrictEqual(initialConfig)
  })
})
