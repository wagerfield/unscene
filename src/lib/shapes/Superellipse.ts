import { Vector } from "../math/Vector"
import { PI, sign } from "../core/math"
import { pointInSuperellipse } from "../math/Geometry"
import { Shape, type ShapeOptions } from "./Shape"

export interface SuperellipseOptions extends ShapeOptions {
  divisions?: number
  exponent?: number
  radiusX?: number
  radiusY?: number
}

export class Superellipse extends Shape {
  private _radius = new Vector()
  private _params = new Vector()

  public points = new Float32Array()

  constructor({
    radiusX = 50,
    radiusY = 50,
    exponent = 5,
    divisions = 16,
    ...options
  }: SuperellipseOptions = {}) {
    super(options)

    this.setRadius(radiusX, radiusY)
    this.exponent = exponent
    this.divisions = divisions
  }

  private updatePoints() {
    const rx = this.radiusX
    const ry = this.radiusY

    const d2 = this.divisions * 2
    const d4 = this.divisions * 4

    const exp = 2 / this.exponent

    for (let i = 0; i < d2; i++) {
      const t = PI * (i / d2)
      const u = i * 2
      const v = u + 1

      const c = Math.cos(t)
      const s = Math.sin(t)

      const x = sign(c) * rx * Math.abs(c) ** exp
      const y = sign(s) * ry * Math.abs(s) ** exp

      this.points[u] = rx + x
      this.points[v] = ry + y

      this.points[d4 + u] = rx - x
      this.points[d4 + v] = ry - y
    }
  }

  contains(point: Vector): boolean {
    this._point.transform(point, this.inverseMatrix)
    return pointInSuperellipse(this.exponent, this._point, this._radius)
  }

  setRadius(x: number, y: number) {
    if (this._radius.equals(x, y)) return
    this._radius.set(Math.max(0, x), Math.max(0, y))
    this.updatePoints()
  }

  set radiusX(value: number) {
    if (this._radius.xEquals(value)) return
    this.setRadius(value, this._radius.y)
  }
  get radiusX(): number {
    return this._radius.x
  }

  set radiusY(value: number) {
    if (this._radius.yEquals(value)) return
    this.setRadius(this._radius.x, value)
  }
  get radiusY(): number {
    return this._radius.y
  }

  set exponent(value: number) {
    value = Math.max(value, 0.1)
    if (this._params.xEquals(value)) return
    this._params.x = value
    this.updatePoints()
  }
  get exponent(): number {
    return this._params.x
  }

  set divisions(value: number) {
    value = Math.max(1, Math.trunc(value))
    if (this._params.yEquals(value)) return
    this.points = new Float32Array(value * 2 * 4)
    this._params.y = value
    this.updatePoints()
  }
  get divisions(): number {
    return this._params.y
  }
}
