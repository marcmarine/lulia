import { validateState, validationRules, type LuliaState } from './state'
import { EphemerisAdapter, swissephEngine } from './engine'
import { calculatePlanets as _calculatePlanets } from './planets'
import { calculateHouses as _calculateHouses } from './houses'
import { calculateAspects as _calculateAspects } from './aspects'
import { createBuilder } from './builder'

export default (initialState: LuliaState, engine: EphemerisAdapter = swissephEngine) => {
  const validatedState = validateState(initialState, validationRules)

  const calculatePlanets = () => _calculatePlanets(validatedState, engine)
  const calculateHouses = () => _calculateHouses(validatedState, engine)
  const calculateAspects = () => _calculateAspects(calculatePlanets())

  const getState = () => validatedState

  return {
    calculatePlanets,
    calculateHouses,
    calculateAspects,
    getState
  }
}

export const Lulia = createBuilder()
