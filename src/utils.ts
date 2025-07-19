import { Position } from './definitions'

export function normalizeDegrees(degrees: number): number {
  if (degrees < -180) {
    return degrees + 360
  }
  if (degrees > 180) {
    return degrees - 360
  }
  return degrees
}

export function decimalToDMS(longitude: number): Position {
  const sign = longitude < 0 ? -1 : 1
  const absVal = Math.abs(longitude)

  const degree = Math.floor(absVal) * sign
  const minutesFull = (absVal - Math.floor(absVal)) * 60
  const minute = Math.floor(minutesFull)
  const secondRaw = (minutesFull - minute) * 60
  const second = Math.round(secondRaw)

  return {
    degree,
    minute,
    second,
    longitude
  }
}
