import { describe, expect, test } from 'vitest'
import { contrastRatio, relativeLuminance } from './contrast'

describe('contrastRatio', () => {
  test('black on white is 21:1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
  })

  test('a colour against itself is 1:1', () => {
    expect(contrastRatio('#0070f2', '#0070f2')).toBe(1)
  })

  test('the order of the arguments does not matter', () => {
    expect(contrastRatio('#0070f2', '#ffffff')).toBe(contrastRatio('#ffffff', '#0070f2'))
  })

  test('white on SAP blue passes AA for text, narrowly', () => {
    const ratio = contrastRatio('#ffffff', '#0070f2')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
    expect(ratio).toBeLessThan(4.7)
  })

  test('accepts upper case and rejects anything that is not six hex digits', () => {
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1, 10)
    expect(() => relativeLuminance('#fff')).toThrow('Not a 6-digit hex colour')
    expect(() => relativeLuminance('blue')).toThrow('Not a 6-digit hex colour')
  })
})
