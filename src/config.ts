import { ValidationError } from './errors'
export interface LuliaConfig {
  date: Date
  longitude: number
  latitude: number
}

interface ValidationRule<T> {
  validate: (value: T) => boolean
  message: string
}

export const validationRules = {
  date: {
    validate: (value: unknown): boolean =>
      value instanceof Date && !isNaN(value.getTime()),
    message: 'Date must be a valid Date object'
  },
  longitude: {
    validate: (value: unknown): boolean =>
      typeof value === 'number' && value >= -180 && value <= 180,
    message: 'Longitude must be a number between -180 and 180'
  },
  latitude: {
    validate: (value: unknown): boolean =>
      typeof value === 'number' && value >= -90 && value <= 90,
    message: 'Latitude must be a number between -90 and 90'
  }
} as const

export const validateConfig = <T extends object>(
  config: T,
  rules: Record<keyof T, ValidationRule<T[keyof T]>>
): T => {
  for (const [key, rule] of Object.entries(rules) as [
    keyof T,
    ValidationRule<T[keyof T]>
  ][]) {
    if (!rule.validate(config[key as keyof T])) {
      throw new ValidationError(`Invalid ${String(key)}: ${rule.message}`)
    }
  }
  return config
}

export const withValidation = <T extends (...args: any[]) => any>(
  fn: T,
  validator: (config: Parameters<T>[0]) => Parameters<T>[0]
) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    const validatedConfig = validator(args[0])
    return fn(validatedConfig, args[1])
  }
}
