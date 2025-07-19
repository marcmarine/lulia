import { describe, it, expect } from 'vitest'
import Lulia from '../src'

describe('Aspects calculations', () => {
  it('should calculate aspects and include expected fields', () => {
    const initialConfig = {
      date: new Date('2025-07-19T21:23:00'),
      longitude: 123.45,
      latitude: 45.67
    }

    const bodies = Lulia(initialConfig).calculateAspects()

    expect(bodies).toHaveProperty('sun')
    expect(bodies.sun).toBeTypeOf('object')

    if (bodies.sun.trigone && bodies.sun.trigone.length > 0) {
      const trigoneAspect = bodies.sun.trigone[0]

      expect(trigoneAspect).toHaveProperty('with')
      expect(trigoneAspect).toHaveProperty('offset')
      expect(trigoneAspect).toHaveProperty('orb')

      expect(typeof trigoneAspect.with).toBe('string')

      expect(typeof trigoneAspect.offset).toBe('object')
    }
  })
})
