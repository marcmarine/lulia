import { describe, it, expect } from 'vitest'
import { Lulia } from '../src'
import { LuliaState } from '../src/state'

describe('Builder', () => {
  it('should return initial state', () => {
    // Agustín García Calvo, born on 15 October 1926 in Zamora
    const initialState = {
      dateTime: new Date(Date.UTC(1926, 9, 15, 3, 0, 0)),
      latitude: 41.498889,
      longitude: -5.755556
    }

    const lulia = Lulia.at(initialState.dateTime).location(initialState.latitude, initialState.longitude)
    const state: LuliaState = {
      dateTime: lulia.dateTime,
      latitude: lulia.latitude,
      longitude: lulia.longitude
    }

    expect(state).toStrictEqual(initialState)
  })

  it('should be chainable', () => {
    const lulia = Lulia.location(41.498889, -5.755556).at('2024-01-01T12:00:00Z')

    const state: LuliaState = {
      dateTime: lulia.dateTime,
      latitude: lulia.latitude,
      longitude: lulia.longitude
    }

    expect(state.latitude).toBe(41.498889)
    expect(state.longitude).toBe(-5.755556)
    expect(state.dateTime).toEqual(new Date('2024-01-01T12:00:00Z'))
  })

  it('should accept date string in various formats', () => {
    const dateString = '1926-10-15T03:00'
    const expectedDate = new Date(dateString)
    const lulia = Lulia.at(dateString)

    expect(lulia.dateTime).toEqual(expectedDate)
  })

  it('should create new builders without mutating previous ones', () => {
    const baseBuilder = Lulia.at('2024-01-01T12:00:00Z')
    const barcelonaBuilder = baseBuilder.location(41.3851, 2.1734)
    const bucharestBuilder = baseBuilder.location(44.4268, 26.1025)

    expect(baseBuilder.latitude).toBeUndefined()
    expect(baseBuilder.longitude).toBeUndefined()

    expect(barcelonaBuilder.latitude).toBe(41.3851)
    expect(barcelonaBuilder.longitude).toBe(2.1734)

    expect(bucharestBuilder.latitude).toBe(44.4268)
    expect(bucharestBuilder.longitude).toBe(26.1025)

    expect(baseBuilder.dateTime).toEqual(barcelonaBuilder.dateTime)
    expect(baseBuilder.dateTime).toEqual(bucharestBuilder.dateTime)
  })
})
