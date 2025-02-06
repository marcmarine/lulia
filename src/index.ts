import {
  withValidation,
  validateConfig,
  validationRules,
  type LuliaConfig
} from './config'
import { PlanetName } from './definitions'
import { EphemerisAdapter, swissephEngine } from './engine'
import { calculatePlanet, calculatePlanets } from './planets'
import { calculateHouses } from './houses'

export default withValidation(
  (initialConfig: LuliaConfig, engine: EphemerisAdapter = swissephEngine) => {
    return {
      calculate: {
        position: (planet: PlanetName) =>
          calculatePlanet(planet, initialConfig, engine),
        planets: () => calculatePlanets(initialConfig, engine),
        houses: () => calculateHouses(initialConfig, engine)
      },
      getConfig: () => initialConfig
    }
  },
  config => validateConfig(config, validationRules)
)
