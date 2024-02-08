import { Matrix } from "./Matrix"

export type VectorArray = [number, number]

export class Vector {
  readonly vector: VectorArray

  constructor(x = 0, y = 0) {
    this.vector = new Float32Array([x, y]) as any
  }

  set(x: number, y: number) {
    this.vector[0] = x
    this.vector[1] = y
    return this
  }

  copy(vector: Vector) {
    return this.set(...vector.vector)
  }

  scale(scalar: number) {
    this.vector[0] *= scalar
    this.vector[1] *= scalar
    return this
  }

  transform(vector: Vector, matrix: Matrix) {
    const [x, y] = vector.vector
    const [a, b, c, d, e, f] = matrix.matrix
    return this.set(a * x + c * y + e, b * x + d * y + f)
  }

  transformSelf(matrix: Matrix) {
    return this.transform(this, matrix)
  }

  xEquals(x: number) {
    return this.vector[0] === x
  }

  yEquals(y: number) {
    return this.vector[1] === y
  }

  equals(x: number, y: number) {
    return this.xEquals(x) && this.yEquals(y)
  }

  set x(value: number) {
    this.vector[0] = value
  }
  get x(): number {
    return this.vector[0]
  }

  set y(value: number) {
    this.vector[1] = value
  }
  get y(): number {
    return this.vector[1]
  }
}
