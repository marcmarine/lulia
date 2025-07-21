import { ASPECTS, BODIES, SIGNS } from './constants'

export type BodyName = (typeof BODIES)[keyof typeof BODIES]
export type SignName = (typeof SIGNS)[keyof typeof SIGNS]
export type AspectType = (typeof ASPECTS)[keyof typeof ASPECTS]
export type HousePosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type LongitudeCoordinates = {
  degree: number
  minute: number
  second: number
  decimal: number
}

export type CelestialBody = {
  name: BodyName
  longitude: LongitudeCoordinates
  isRetrograde: boolean
  zodiacSign: SignName
  housePosition?: HousePosition
}

export type House = {
  longitude: LongitudeCoordinates
  zodiacSign: SignName
}

export type AspectAngle = keyof typeof ASPECTS

export interface Aspect {
  type: AspectType
  targetBody: BodyName
  orbAllowance: number
  deviation: LongitudeCoordinates
}

export type CelestialBodies = CelestialBody[]
export type Aspects = Aspect[]
export type Houses = House[]
