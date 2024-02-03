import { Shape, type ShapeOptions } from "./Shape"

export interface PointOptions extends ShapeOptions {
  radius?: number
}

export class Point extends Shape {
  private _radius = 0

  constructor(options: PointOptions = {}) {
    super(options)

    this.radius = options.radius ?? 0
  }

  set radius(value: number) {
    if (this._radius === value) return
    this._radius = Math.max(0, value)
  }
  get radius(): number {
    return this._radius
  }
}
