import type { LuliaConfig } from './config'
import { BODIES } from './constants'
import { BodyName, BodyPositon } from './definitions'
import { EphemerisAdapter } from './engine'

function getJulianDay(date: Date, engine: EphemerisAdapter): number {
  return engine.calculateJulianDay(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours())
}

export function calculateBody(body: BodyName, config: LuliaConfig, engine: EphemerisAdapter): BodyPositon {
  const julianDay = getJulianDay(config.date, engine)
  return engine.calculateBodyPosition(body, julianDay)
}

export function calculateBodies(config: LuliaConfig, engine: EphemerisAdapter): Record<BodyName, BodyPositon> {
  const julianDay = getJulianDay(config.date, engine)
  return Object.entries(BODIES).reduce((acc, [, body]) => {
    return {
      ...acc,
      [body]: engine.calculateBodyPosition(body, julianDay)
    }
  }, {} as Record<BodyName, BodyPositon>)
}
