export type ColorArray = [number, number, number, number]

export const HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i

export class Color {
  readonly color: ColorArray

  constructor(r = 0, g = 0, b = 0, a = 0) {
    this.color = new Float32Array([r, g, b, a]) as any
  }

  set(r: number, g: number, b: number, a: number) {
    this.color[0] = r
    this.color[1] = g
    this.color[2] = b
    this.color[3] = a
    return this
  }

  copy(color: Color) {
    return this.set(...color.color)
  }

  fromHex(hex: string) {
    const match = hex.match(HEX)
    if (!match) return this
    const [, r, g, b, a = "ff"] = match
    this.color[0] = parseInt(r, 16) / 255
    this.color[1] = parseInt(g, 16) / 255
    this.color[2] = parseInt(b, 16) / 255
    this.color[3] = parseInt(a, 16) / 255
    return this
  }

  set r(value: number) {
    this.color[0] = value
  }
  get r() {
    return this.color[0]
  }

  set g(value: number) {
    this.color[1] = value
  }
  get g() {
    return this.color[1]
  }

  set b(value: number) {
    this.color[2] = value
  }
  get b() {
    return this.color[2]
  }

  set a(value: number) {
    this.color[3] = value
  }
  get a() {
    return this.color[3]
  }
}
