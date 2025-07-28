import { ASPECTS, ORBS } from './constants'
import type { AspectAngle, AspectType, CelestialBody, Aspect } from './definitions'
import { convertDecimalToDegree, normalizeDegrees } from './utils'

function getLongitudeDiff(a: number, b: number): number {
  const longitudeA = normalizeDegrees(a)
  const longitudeB = normalizeDegrees(b)

  const diff = Math.abs(longitudeA - longitudeB)

  return diff > 180 ? 360 - diff : diff
}

function findMatchingAspect(diff: number): {
  type: AspectType
  offset: number
} | null {
  for (const angleStr in ASPECTS) {
    const angle = parseFloat(angleStr)
    const orb = ORBS[angle as AspectAngle]
    const deviation = Math.abs(diff - angle)

    if (deviation <= orb) {
      return {
        type: ASPECTS[angle as AspectAngle],
        offset: diff - angle
      }
    }
  }

  return null
}

export function aspect(
  planet: CelestialBody,
  targetPlanet: CelestialBody
):
  | {
      offset: number
      type: AspectType
    }
  | undefined {
  const diff = getLongitudeDiff(planet.longitude.decimal, targetPlanet.longitude.decimal)
  const match = findMatchingAspect(diff)

  if (!match) return undefined

  return {
    offset: match.offset,
    type: match.type
  }
}

export function calculateAspects(bodies: CelestialBody[]): Aspect[] {
  const result: Aspect[] = [] as Aspect[]

  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const planet = bodies[i]
      const targetPlanet = bodies[j]

      const aspectData = aspect(planet, targetPlanet)

      if (!aspectData) continue

      const { type, offset } = aspectData
      const deviation = convertDecimalToDegree(offset)

      result.push({
        planet: planet.name,
        type,
        targetPlanet: targetPlanet.name,
        deviation
      })

      result.push({
        planet: targetPlanet.name,
        type,
        targetPlanet: planet.name,
        deviation
      })
    }
  }

  return result
}
