import { Vector } from "./Vector"

export type MatrixArray = [number, number, number, number, number, number]

export class Matrix {
  readonly matrix: MatrixArray

  constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
    this.matrix = new Float32Array([a, b, c, d, e, f]) as any
  }

  set(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.matrix[0] = a
    this.matrix[1] = b
    this.matrix[2] = c
    this.matrix[3] = d
    this.matrix[4] = e
    this.matrix[5] = f
    return this
  }

  copy(matrix: Matrix) {
    return this.set(...matrix.matrix)
  }

  identity() {
    return this.set(1, 0, 0, 1, 0, 0)
  }

  invert(matrix: Matrix) {
    const [a, b, c, d, e, f] = matrix.matrix
    const det = a * d - b * c
    if (!det) return this.identity()
    const inv = 1 / det
    const m11 = inv * d
    const m12 = inv * -b
    const m21 = inv * -c
    const m22 = inv * a
    const m31 = inv * (c * f - d * e)
    const m32 = inv * (b * e - a * f)
    return this.set(m11, m12, m21, m22, m31, m32)
  }

  multiply(a: Matrix, b: Matrix) {
    const [a11, a12, a21, a22, a31, a32] = a.matrix
    const [b11, b12, b21, b22, b31, b32] = b.matrix
    const m11 = a11 * b11 + a12 * b21
    const m12 = a11 * b12 + a12 * b22
    const m21 = a21 * b11 + a22 * b21
    const m22 = a21 * b12 + a22 * b22
    const m31 = a31 * b11 + a32 * b21 + b31
    const m32 = a31 * b12 + a32 * b22 + b32
    return this.set(m11, m12, m21, m22, m31, m32)
  }

  multiplySelf(matrix: Matrix) {
    return this.multiply(this, matrix)
  }

  fromPosition(point: Vector) {
    const [x, y] = point.vector
    return this.set(1, 0, 0, 1, x, y)
  }

  fromRotation(radians: number) {
    const s = Math.sin(radians)
    const c = Math.cos(radians)
    return this.set(c, s, -s, c, 0, 0)
  }

  fromScale(scale: Vector) {
    const [x, y] = scale.vector
    return this.set(x, 0, 0, y, 0, 0)
  }
}
