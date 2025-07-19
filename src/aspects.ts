import { ASPECTS, ORBS } from './constants'
import type { AspectAngle, AspectName, AspectsByBody, BodyName, BodyPositon } from './definitions'
import { decimalToDMS, normalizeDegrees } from './utils'

function getLongitudeDiff([a, b]: BodyPositon[]): number {
  const longitudeA = normalizeDegrees(a.position.longitude)
  const longitudeB = normalizeDegrees(b.position.longitude)

  return Math.abs(longitudeA - longitudeB)
}

function findMatchingAspect(diff: number): { angle: number; orb: number; name: AspectName; offset: number } | null {
  for (const angleStr of Object.keys(ASPECTS)) {
    const angle = parseFloat(angleStr)
    const orb = ORBS[angle as AspectAngle]

    const from = angle - orb / 2
    const to = angle + orb / 2

    if (diff >= from && diff <= to) {
      const offset = diff - angle

      return {
        angle,
        orb,
        name: ASPECTS[angle as AspectAngle],
        offset
      }
    }
  }
  return null
}

export function aspect([first, second]: BodyPositon[]):
  | {
      angle: number
      orb: number
      offset: number
      name: AspectName
      bodies: BodyName[]
    }
  | undefined {
  const diff = getLongitudeDiff([first, second])
  const match = findMatchingAspect(diff)
  if (!match) return undefined

  return {
    angle: match.angle,
    orb: match.orb,
    offset: match.offset,
    name: match.name,
    bodies: [first.name, second.name]
  }
}

export function aspects(bodies: Record<BodyName, BodyPositon>): AspectsByBody {
  const result: AspectsByBody = {} as AspectsByBody

  const keys = Object.keys(bodies)

  for (let i = 0; i < keys.length; i++) {
    const keyA = keys[i]
    const bodyA = bodies[keyA as BodyName]
    result[bodyA.name] = {}

    for (let j = 0; j < keys.length; j++) {
      if (i === j) continue

      const keyB = keys[j]
      const bodyB = bodies[keyB as BodyName]

      const aspectData = aspect([bodyA, bodyB])
      if (!aspectData) continue

      const { name, angle, orb, offset, bodies: aspectedBodies } = aspectData

      if (!result[bodyA.name][name]) {
        result[bodyA.name][name] = []
      }

      result[bodyA.name][name]?.push({
        with: aspectedBodies[1],
        angle,
        offset: decimalToDMS(offset),
        orb
      })
    }
  }

  return result
}
