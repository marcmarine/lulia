import { calculateBodies } from './bodies'
import { calculateHouses } from './houses'
import { swissephEngine } from './engine'
import { createState, LuliaState, validateCoordinates } from './state'
import { calculateAspects } from './aspects'
import type { Aspect, CelestialBody, House } from './definitions'

export interface LuliaBuilder extends LuliaState {
  at: (dateTime: Date | string) => LuliaBuilder
  location: (latitude: number, longitude: number) => LuliaBuilder
  planets: CelestialBody[]
  houses?: House[]
  aspects: Aspect[]
}

export function createBuilder(initialState: LuliaState = createState()): LuliaBuilder {
  const state = { ...initialState }

  const at = (dateTime: Date | string) => {
    let parsedDate: Date
    if (typeof dateTime === 'string') {
      parsedDate = new Date(dateTime)
    } else if (dateTime instanceof Date) {
      parsedDate = new Date(dateTime.getTime())
    } else {
      throw new Error('Invalid date format. Use Date object or ISO string.')
    }

    const newState = { ...state, dateTime: parsedDate }
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

  const shouldCalculateHouses = state.latitude !== undefined || state.longitude !== undefined

  const planets = calculateBodies(state, swissephEngine)
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
