import { validateConfig, validationRules, type LuliaConfig } from './config'
import { EphemerisAdapter, swissephEngine } from './engine'
import { bodies } from './bodies'
import { houses } from './houses'
import { aspects } from './aspects'

export default (initialConfig: LuliaConfig, engine: EphemerisAdapter = swissephEngine) => {
  const validatedConfig = validateConfig(initialConfig, validationRules)

  const calculateBodies = () => bodies(validatedConfig, engine)
  const calculateHouses = () => houses(validatedConfig, engine)
  const calculateAspects = () => aspects(calculateBodies())

  const getConfig = () => validatedConfig

  return {
    calculateBodies,
    calculateHouses,
    calculateAspects,
    getConfig
  }
}
