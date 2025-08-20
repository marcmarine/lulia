import { calculatePlanets } from './planets'
import { calculateHouses } from './houses'
import { swissephEngine } from './engine'
import { createState, LuliaState, validateCoordinates, validationRules } from './state'
import { calculateAspects } from './aspects'
import type { Aspect, Planet, House } from './definitions'

export interface LuliaBuilder extends LuliaState {
  at: (dateTime: string) => LuliaBuilder
  location: (latitude: number, longitude: number) => LuliaBuilder
  planets: Planet[]
  houses?: House[]
  aspects: Aspect[]
}

export function createBuilder(initialState: LuliaState = createState()): LuliaBuilder {
  const state = { ...initialState }

  const at = (dateTime: string) => {
    if (!validationRules.dateTime.validate(dateTime)) {
      throw new Error('Invalid date string provided to at()')
    }

    const newState = { ...state, dateTime }
    return createBuilder(newState)
  }

  const location = (latitude: number, longitude: number) => {
    validateCoordinates(latitude, longitude)

    const newState = {
      ...state,
      latitude,
      longitude
    }
    return createBuilder(newState)
  }

  const shouldCalculateHouses = state.latitude !== undefined && state.longitude !== undefined

  const planets = calculatePlanets(state, swissephEngine)
  const houses = shouldCalculateHouses ? calculateHouses(state, swissephEngine) : undefined
  const aspects = calculateAspects(planets)

  return {
    at,
    location,

    planets,
    houses,
    aspects,

    ...state
  }
}
