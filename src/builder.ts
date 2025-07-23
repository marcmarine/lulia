import { bodies } from './bodies'
import { houses } from './houses'
import { swissephEngine } from './engine'
import { createState, LuliaState, validateCoordinates } from './state'
import { aspects } from './aspects'

export function createBuilder(initialState: LuliaState = createState()) {
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

  const calculateBodies = () => bodies(state, swissephEngine)
  const calculateHouses = () => houses(state, swissephEngine)
  const calculateAspects = () => aspects(calculateBodies())

  const _getState = () => ({ ...state })

  return {
    at,
    location,

    calculateBodies,
    calculateHouses,
    calculateAspects,

    _getState
  }
}
