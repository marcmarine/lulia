import { describe, it, expect } from 'vitest'
import Lulia from '../src'

describe('Aspects calculations', () => {
  it('should calculate aspects and include expected fields', () => {
    const initialConfig = {
      date: new Date('2025-07-19T21:23:00'),
      longitude: 123.45,
      latitude: 45.67
    }

    const aspects = Lulia(initialConfig).calculateAspects()
    const aspect = aspects.sun[0]

    expect(aspects).toHaveProperty('sun')

    expect(aspect).toHaveProperty('type')
    expect(aspect.type).toBe('trigone')
  })
})
