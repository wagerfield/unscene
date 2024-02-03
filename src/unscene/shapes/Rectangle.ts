import { Vector } from "../math/Vector"
import { pointInRectangle } from "../math/Geometry"
import { Shape, type ShapeOptions } from "./Shape"

export interface RectangleOptions extends ShapeOptions {
  width?: number
  height?: number
  radius?: number
}

export class Rectangle extends Shape {
  private _size = new Vector()
  private _radius = 0

  constructor({
    width = 100,
    height = 100,
    radius = 0,
    ...options
  }: RectangleOptions = {}) {
    super(options)

    this.setSize(width, height)
    this.setRadius(radius)
  }

  contains(point: Vector): boolean {
    this._point.transform(point, this.inverseMatrix)
    return pointInRectangle(this._point, this._bounds, this._radius)
  }

  setSize(width: number, height: number) {
    this._size.set(Math.max(0, width), Math.max(0, height))
    this._bounds.setSize(this._size.x, this._size.y)
  }

  setRadius(radius: number) {
    this._radius = Math.max(0, radius)
  }

  set width(value: number) {
    this.setSize(value, this._size.y)
  }
  get width(): number {
    return this._size.x
  }

  set height(value: number) {
    this.setSize(this._size.x, value)
  }
  get height(): number {
    return this._size.y
  }

  set radius(value: number) {
    this.setRadius(value)
  }
  get radius(): number {
    return this._radius
  }
}
