import { describe, it, expect } from 'vitest'
import Lulia from '../src'

describe('Aspects calculations', () => {
  it('should calculate aspects and include expected fields', () => {
    const initialState = {
      dateTime: new Date(Date.UTC(2025, 6, 19, 19, 23)),
      longitude: 123.45,
      latitude: 45.67
    }

    const aspects = Lulia(initialState).calculateAspects()
    const aspect = aspects[0]

    expect(aspect).toHaveProperty('type')
    expect(aspect.type).toBe('trigone')
    expect(aspect.targetPlanet).toBe('saturn')
  })
})
