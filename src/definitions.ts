import { ASPECTS, BODIES, SIGNS } from './constants'

export type BodyName = (typeof BODIES)[keyof typeof BODIES]

export type Sign = (typeof SIGNS)[keyof typeof SIGNS]

export type Position = {
  degree: number
  minute: number
  second: number
  longitude: number
}

export type BodyPositon = {
  name: BodyName
  position: Position
  retrograde: boolean
  sign: Sign
}

export type HousePosition = {
  position: Position
  sign: Sign
}

export type HousePositions = Record<number, HousePosition>

export type AspectName = (typeof ASPECTS)[keyof typeof ASPECTS]

export type AspectAngle = keyof typeof ASPECTS

export interface AspectDetail {
  with: BodyName
  angle: number
  orb: number
  offset: Position
}

export type BodyAspects = {
  [key in AspectName]?: AspectDetail[]
}

export type AspectsByBody = Record<BodyName, BodyAspects>
