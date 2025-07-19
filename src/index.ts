import { validateConfig, validationRules, type LuliaConfig } from './config'
import { EphemerisAdapter, swissephEngine } from './engine'
import { calculateBodies as _calculateBodies } from './bodies'
import { calculateHouses as _calculateHouses } from './houses'

export default (initialConfig: LuliaConfig, engine: EphemerisAdapter = swissephEngine) => {
  const validatedConfig = validateConfig(initialConfig, validationRules)

  const calculateBodies = () => _calculateBodies(validatedConfig, engine)
  const calculateHouses = () => _calculateHouses(validatedConfig, engine)

  const getConfig = () => validatedConfig

  return {
    calculateBodies,
    calculateHouses,
    getConfig
  }
}
