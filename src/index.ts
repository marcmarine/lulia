import { validateState, validationRules, type LuliaState } from './state'
import { EphemerisAdapter, swissephEngine } from './engine'
import { bodies } from './bodies'
import { houses } from './houses'
import { aspects } from './aspects'
import { createBuilder } from './builder'

export default (initialState: LuliaState, engine: EphemerisAdapter = swissephEngine) => {
  const validatedState = validateState(initialState, validationRules)

  const calculateBodies = () => bodies(validatedState, engine)
  const calculateHouses = () => houses(validatedState, engine)
  const calculateAspects = () => aspects(calculateBodies())

  const getState = () => validatedState

  return {
    calculateBodies,
    calculateHouses,
    calculateAspects,
    getState
  }
}

export const Lulia = createBuilder()
