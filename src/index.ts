import { validateState, validationRules, type LuliaState } from './state'
import { EphemerisAdapter, swissephEngine } from './engine'
import { calculateBodies as _calculateBodies } from './bodies'
import { calculateHouses as _calculateHouses } from './houses'
import { calculateAspects as _calculateAspects } from './aspects'
import { createBuilder } from './builder'

export default (initialState: LuliaState, engine: EphemerisAdapter = swissephEngine) => {
  const validatedState = validateState(initialState, validationRules)

  const calculateBodies = () => _calculateBodies(validatedState, engine)
  const calculateHouses = () => _calculateHouses(validatedState, engine)
  const calculateAspects = () => _calculateAspects(calculateBodies())

  const getState = () => validatedState

  return {
    calculateBodies,
    calculateHouses,
    calculateAspects,
    getState
  }
}

export const Lulia = createBuilder()
