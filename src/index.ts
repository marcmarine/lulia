import {
  withValidation,
  validateConfig,
  validationRules,
  type LuliaConfig
} from './config'
import { EphemerisAdapter, swissephEngine } from './engine'
import { calculatePlanets } from './planets'

export default withValidation(
  (initialConfig: LuliaConfig, engine: EphemerisAdapter = swissephEngine) => {
    return {
      calculate: {
        planets: () => calculatePlanets(initialConfig, engine)
      },
      getConfig: () => initialConfig
    }
  },
  config => validateConfig(config, validationRules)
)
