import { ASPECTS, ORBS } from './constants'
import type { AspectAngle, AspectType, Aspects, CelestialBody, CelestialBodies, BodyName } from './definitions'
import { decimalToDMS, normalizeDegrees } from './utils'

function getLongitudeDiff([a, b]: CelestialBody[]): number {
  const longitudeA = normalizeDegrees(a.longitude.decimal)
  const longitudeB = normalizeDegrees(b.longitude.decimal)

  return Math.abs(longitudeA - longitudeB)
}

function findMatchingAspect(diff: number): { orb: number; type: AspectType; offset: number } | null {
  for (const angleStr of Object.keys(ASPECTS)) {
    const angle = parseFloat(angleStr)
    const orb = ORBS[angle as AspectAngle]

    const from = angle - orb / 2
    const to = angle + orb / 2

    if (diff >= from && diff <= to) {
      const offset = diff - angle

      return {
        orb,
        type: ASPECTS[angle as AspectAngle],
        offset
      }
    }
  }
  return null
}

export function aspect([first, second]: CelestialBody[]):
  | {
      orb: number
      offset: number
      type: AspectType
      bodies: BodyName[]
    }
  | undefined {
  const diff = getLongitudeDiff([first, second])
  const match = findMatchingAspect(diff)
  if (!match) return undefined

  return {
    orb: match.orb,
    offset: match.offset,
    type: match.type,
    bodies: [first.name, second.name]
  }
}

export function aspects(bodies: CelestialBodies): Record<BodyName, Aspects> {
  const result: Record<BodyName, Aspects> = {} as any

  for (let i = 0; i < bodies.length; i++) {
    const bodyA = bodies[i]
    result[bodyA.name] = []

    for (let j = 0; j < bodies.length; j++) {
      if (i === j) continue

      const bodyB = bodies[j]

      const aspectData = aspect([bodyA, bodyB])
      if (!aspectData) continue

      const { type, orb, offset, bodies: aspectedBodies } = aspectData

      result[bodyA.name].push({
        type,
        targetBody: aspectedBodies[1],
        deviation: decimalToDMS(offset),
        orbAllowance: orb
      })
    }
  }

  return result
}
