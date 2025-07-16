import { withValidation, validateConfig, validationRules, type LuliaConfig } from './config'
import { PlanetName } from './definitions'
import { EphemerisAdapter, swissephEngine } from './engine'
import { calculatePlanet, calculatePlanets } from './planets'
import { calculateHouses } from './houses'

export default withValidation(
  (initialConfig: LuliaConfig, engine: EphemerisAdapter = swissephEngine) => {
    const position = (planet: PlanetName) => calculatePlanet(planet, initialConfig, engine)
    const planets = () => calculatePlanets(initialConfig, engine)
    const houses = () => calculateHouses(initialConfig, engine)

    return {
      calculate: {
        position,
        planets,
        houses
      },
      getConfig: () => initialConfig
    }
  },
  config => validateConfig(config, validationRules)
)
