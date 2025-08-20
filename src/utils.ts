import { House, Position } from './definitions'

export function normalizeDegrees(degrees: number): number {
  const normalized = degrees % 360

  return normalized < 0 ? normalized + 360 : normalized
}

export function convertDecimalToDegree(decimal: number): Position {
  const sign = decimal < 0 ? -1 : 1
  const absouteValue = Math.abs(decimal)

  const degree = Math.floor(absouteValue)
  const minute = Math.floor((absouteValue - degree) * 60)
  const second = Math.round((absouteValue - degree - minute / 60) * 3600)

  return {
    degree: degree * sign,
    minute,
    second,
    decimal
  }
}

export function findHouseForLongitude(houses: House[], longitude: number): number {
  const totalHouses = houses.length

  for (let i = 0; i < totalHouses; i++) {
    const start = houses[i].position.decimal
    const end = houses[(i + 1) % totalHouses].position.decimal

    if (isLongitudeInRange(longitude, start, end)) {
      return houses[i].number
    }
  }

  return houses[0].number
}

function isLongitudeInRange(longitude: number, start: number, end: number): boolean {
  if (start > end) {
    return longitude >= start || longitude < end
  }
  return longitude >= start && longitude < end
}

export function getZodiacPosition(decimalDegree: number): {
  signIndex: number
  degree: number
} {
  const normalizedDegree = normalizeDegrees(decimalDegree)

  const signIndex = Math.floor(normalizedDegree / 30)
  const degreeInSign = normalizedDegree % 30

  return {
    signIndex,
    degree: degreeInSign
  }
}

export function getLocaleISODateString(): string {
  // Using the Swedish locale ("sv-SE") formats the date as ISO-like "YYYY-MM-DD HH:mm:ss".
  return new Date().toLocaleString("sv-SE").slice(0, -3)
}


export function parseLocaleISODateString(dateLocaleString: string): [year: number, month: number,day: number, hour:number, minute: number] {
  const [year, month, day, hour, minute] = dateLocaleString
    .replace('T', ' ')
    .split(/[- :]/)
    .map(Number)

  return [year, month, day, hour, minute]
}
