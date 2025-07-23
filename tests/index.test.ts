import { describe, it, expect } from 'vitest'
import Lulia from '../src'

describe('Lulia', () => {
  it('should return initial state', () => {
    const initialState = {
      dateTime: new Date(),
      longitude: 123.45,
      latitude: 45.67
    }

    const state = Lulia(initialState).getState()

    expect(state).toStrictEqual(initialState)
  })
})
