import { validateConfig, validationRules, type LuliaConfig } from './config'
import { PlanetName } from './definitions'
import { EphemerisAdapter, swissephEngine } from './engine'
import { calculatePlanet, calculatePlanets } from './planets'
import { calculateHouses } from './houses'

export default (initialConfig: LuliaConfig, engine: EphemerisAdapter = swissephEngine) => {
  const validatedConfig = validateConfig(initialConfig, validationRules)

  const position = (planet: PlanetName) => calculatePlanet(planet, initialConfig, engine)
  const planets = () => calculatePlanets(validatedConfig, engine)
  const houses = () => calculateHouses(validatedConfig, engine)

  const getConfig = () => validatedConfig

  return {
    calculate: {
      position,
      planets,
      houses
    },
    getConfig
  }
}
