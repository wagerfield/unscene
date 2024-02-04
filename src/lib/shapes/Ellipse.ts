import { Vector } from "../math/Vector"
import { pointInEllipse } from "../math/Geometry"
import { Shape, type ShapeOptions } from "./Shape"

export interface EllipseOptions extends ShapeOptions {
  radiusX?: number
  radiusY?: number
}

export class Ellipse extends Shape {
  private _radius = new Vector()

  constructor({ radiusX = 50, radiusY = 50, ...options }: EllipseOptions = {}) {
    super(options)

    this.setRadius(radiusX, radiusY)
  }

  contains(point: Vector): boolean {
    this._point.transform(point, this.inverseMatrix)
    return pointInEllipse(this._point, this._radius)
  }

  setRadius(x: number, y: number) {
    this._radius.set(Math.max(0, x), Math.max(0, y))
  }

  set radiusX(value: number) {
    this.setRadius(value, this._radius.y)
  }
  get radiusX(): number {
    return this._radius.x
  }

  set radiusY(value: number) {
    this.setRadius(this._radius.x, value)
  }
  get radiusY(): number {
    return this._radius.y
  }
}
