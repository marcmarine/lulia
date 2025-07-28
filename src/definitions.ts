import { ASPECTS, BODIES, SIGNS } from './constants'

export type PlanetName = (typeof BODIES)[keyof typeof BODIES]
export type SignName = (typeof SIGNS)[keyof typeof SIGNS]
export type AspectType = (typeof ASPECTS)[keyof typeof ASPECTS]
export type AspectAngle = keyof typeof ASPECTS
export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type Longitude = {
  degree: number
  minute: number
  second: number
  decimal: number
}

export type Planet = {
  name: PlanetName
  longitude: Longitude
  isRetrograde: boolean
  zodiacSign: SignName
  housePosition?: HouseNumber
}

export type House = {
  number: HouseNumber
  longitude: Longitude
  zodiacSign: SignName
}
export interface Aspect {
  planet: PlanetName
  type: AspectType
  targetPlanet: PlanetName
  deviation: Longitude
}
