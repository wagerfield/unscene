import { Shape, type ShapeOptions } from "./Shape"

export interface PolygonOptions extends ShapeOptions {
  radius?: number
  sides?: number
}

export class Polygon extends Shape {
  private _radius = 50
  private _sides = 3

  constructor(options: PolygonOptions = {}) {
    super()
    this.radius = options.radius ?? 50
    this.sides = options.sides ?? 3
  }

  set radius(value: number) {
    if (this._radius === value) return
    this._radius = Math.max(0, value)
  }
  get radius(): number {
    return this._radius
  }

  set sides(value: number) {
    if (this._sides === value) return
    this._sides = Math.max(3, value)
  }
  get sides(): number {
    return this._sides
  }
}
