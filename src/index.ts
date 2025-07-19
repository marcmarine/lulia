import { validateConfig, validationRules, type LuliaConfig } from './config'
import { EphemerisAdapter, swissephEngine } from './engine'
import { calculateBodies } from './bodies'
import { calculateHouses } from './houses'

export default (initialConfig: LuliaConfig, engine: EphemerisAdapter = swissephEngine) => {
  const validatedConfig = validateConfig(initialConfig, validationRules)

  const bodies = () => calculateBodies(validatedConfig, engine)
  const houses = () => calculateHouses(validatedConfig, engine)

  const getConfig = () => validatedConfig

  return {
    bodies,
    houses,
    getConfig
  }
}
