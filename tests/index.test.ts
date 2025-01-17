import { describe, it, expect } from 'vitest'
import { hello } from '../src'

describe('hello function', () => {
  it('should return a greeting with the default name "World"', () => {
    const result = hello()
    expect(result).toMatch(
      /Hello, World!|Hi, World!|Greetings, World!|Hey, World!|Bonjour, World!/
    )
  })

  it('should return a greeting with a provided name', () => {
    const result = hello('Marc')
    expect(result).toMatch(
      /Hello, Marc!|Hi, Marc!|Greetings, Marc!|Hey, Marc!|Bonjour, Marc!/
    )
  })
})
