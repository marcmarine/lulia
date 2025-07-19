export const SIGNS = {
  ARIES: 'aries',
  TAURUS: 'taurus',
  GEMINI: 'gemini',
  CANCER: 'cancer',
  LEO: 'leo',
  VIRGO: 'virgo',
  LIBRA: 'libra',
  SCORPIO: 'scorpio',
  SAGITTARIUS: 'sagittarius',
  CAPRICORN: 'capricorn',
  AQUARIUS: 'aquarius',
  PISCES: 'pisces'
} as const

export const BODIES = {
  SUN: 'sun',
  MOON: 'moon',
  MERCURY: 'mercury',
  VENUS: 'venus',
  MARS: 'mars',
  JUPITER: 'jupiter',
  SATURN: 'saturn',
  URANUS: 'uranus',
  NEPTUNE: 'neptune',
  PLUTO: 'pluto'
} as const

export const ASPECTS = {
  0: 'conjunction',
  30: 'semisextile',
  60: 'sextile',
  90: 'quadrature',
  120: 'trigone',
  150: 'quincunx',
  180: 'opposition'
} as const

export const ORBS = {
  0: 10,
  30: 3,
  60: 6,
  90: 10,
  120: 10,
  150: 3,
  180: 10
} as const
