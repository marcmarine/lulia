import { BODIES, SIGNS } from './constants'

export type BodyName = (typeof BODIES)[keyof typeof BODIES]

export type Sign = (typeof SIGNS)[keyof typeof SIGNS]

export type Position = {
  degree: number
  minute: number
  second: number
}

export type BodyPositon = {
  position: Position
  retrograde: boolean
  sign: Sign
}

export type HousePosition = {
  position: Position
  sign: Sign
}

export type HousePositions = Record<number, HousePosition>
