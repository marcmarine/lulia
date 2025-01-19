import { PLANETS } from './constants'

export type PlanetName = (typeof PLANETS)[keyof typeof PLANETS]

export type PlanetPositon = {
  position: {
    degree: number
    minute: number
    second: number
    longitude: number
  }
  retrograde: boolean
  sign: number
}
