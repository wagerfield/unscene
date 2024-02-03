const HEX = "0123456789abcdef"
const LEN = HEX.length

export function uid(length = 10) {
  let result = ""
  while (length--) result += HEX[(Math.random() * LEN) | 0]
  return result
}

export const raf = requestAnimationFrame

export const caf = cancelAnimationFrame

export const noop = () => null

export const equals = <T>(a: T, b: T) => a === b

export const now = () => (performance ?? Date).now()

export const addUnit = (unit: string) => (value: number) => `${value}${unit}`

export const rem = addUnit("rem")

export const px = addUnit("px")
