import { Houses, Longitude } from './definitions'

export function normalizeDegrees(degrees: number): number {
  if (degrees < -180) {
    return degrees + 360
  }
  if (degrees > 180) {
    return degrees - 360
  }
  return degrees
}

export function decimalToDMS(decimal: number): Longitude {
  const sign = decimal < 0 ? -1 : 1
  const absVal = Math.abs(decimal)

  const degree = Math.floor(absVal) * sign
  const minutesFull = (absVal - Math.floor(absVal)) * 60
  const minute = Math.floor(minutesFull)
  const secondRaw = (minutesFull - minute) * 60
  const second = Math.round(secondRaw)

  return {
    degree,
    minute,
    second,
    decimal
  }
}

export function findHouseForLongitude(houses: Houses, longitude: number): number {
  for (let houseIndex = 0; houseIndex < houses.length; houseIndex++) {
    const currentHouseCusp = houses[houseIndex].longitude.decimal
    const nextHouseCusp = houses[(houseIndex + 1) % 12].longitude.decimal

    if (isInHouseBoundaries(longitude, currentHouseCusp, nextHouseCusp)) {
      return houseIndex + 1
    }
  }

  return 1
}

export function isInHouseBoundaries(planetLong: number, houseStart: number, houseEnd: number): boolean {
  if (houseStart > houseEnd) {
    return planetLong >= houseStart || planetLong < houseEnd
  }
  return planetLong >= houseStart && planetLong < houseEnd
}
