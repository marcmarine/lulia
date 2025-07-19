import { validateConfig, validationRules, type LuliaConfig } from './config'
import { EphemerisAdapter, swissephEngine } from './engine'
import { bodies } from './bodies'
import { houses } from './houses'

export default (initialConfig: LuliaConfig, engine: EphemerisAdapter = swissephEngine) => {
  const validatedConfig = validateConfig(initialConfig, validationRules)

  const calculateBodies = () => bodies(validatedConfig, engine)
  const calculateHouses = () => houses(validatedConfig, engine)

  const getConfig = () => validatedConfig

  return {
    calculateBodies,
    calculateHouses,
    getConfig
  }
}
