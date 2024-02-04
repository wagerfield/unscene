import { degToRad } from "../core/math"
import { Vector } from "../math/Vector"
import { Matrix, type MatrixArray } from "../math/Matrix"
import { Container, type ContainerOptions } from "./Container"

export interface NodeOptions extends ContainerOptions {
  x?: number
  y?: number

  originX?: number
  originY?: number

  scaleX?: number
  scaleY?: number
  scale?: number

  rotation?: number

  selected?: boolean
  focused?: boolean
  hidden?: boolean
  locked?: boolean
}

export abstract class Node extends Container<Node> {
  private _positionMatrix = new Matrix()
  private _rotationMatrix = new Matrix()
  private _rotationVector = new Vector()
  private _originMatrix = new Matrix()
  private _scaleMatrix = new Matrix()

  readonly localMatrix = new Matrix()
  readonly worldMatrix = new Matrix()
  readonly inverseMatrix = new Matrix()

  readonly origin = new Vector()
  readonly position = new Vector()
  readonly scale = new Vector(1, 1)

  public selected = false
  public focused = false
  public hidden = false
  public locked = false

  constructor({
    x = 0,
    y = 0,
    scale,
    scaleX = 1,
    scaleY = 1,
    originX = 0,
    originY = 0,
    rotation = 0,
    selected = false,
    focused = false,
    hidden = false,
    locked = false,
    ...options
  }: NodeOptions = {}) {
    super(options)

    this.setOrigin(originX, originY)
    this.setScale(scale ?? scaleX, scale ?? scaleY)
    this.setRotation(rotation)
    this.setPosition(x, y)

    this.selected = selected
    this.focused = focused
    this.hidden = hidden
    this.locked = locked
  }

  private updateLocalMatrix() {
    return this.localMatrix
      .multiply(this._originMatrix, this._scaleMatrix)
      .multiplySelf(this._rotationMatrix)
      .multiplySelf(this._positionMatrix)
  }

  private updateWorldMatrix() {
    return this.parent
      ? this.worldMatrix.multiply(this.localMatrix, this.parent.worldMatrix)
      : this.worldMatrix.copy(this.localMatrix)
  }

  private updateInverseMatrix() {
    return this.inverseMatrix.invert(this.worldMatrix)
  }

  // Transform

  setPosition(x = 0, y = x): void {
    if (this.position.equals(x, y)) return
    this.position.set(x, y)
    this._positionMatrix.fromPosition(this.position)
    this.updateLocalMatrix()
  }

  setOrigin(x = 0, y = x): void {
    if (this.origin.equals(x, y)) return
    this.origin.set(x, y)
    this._originMatrix.fromPosition(this.origin)
    this.updateLocalMatrix()
  }

  setScale(x = 1, y = x): void {
    if (this.scale.equals(x, y)) return
    this.scale.set(x, y)
    this._scaleMatrix.fromScale(this.scale)
    this.updateLocalMatrix()
  }

  setRotation(degrees = 0): void {
    if (this._rotationVector.xEquals(degrees)) return
    this._rotationVector.set(degrees, degToRad(degrees % 360))
    this._rotationMatrix.fromRotation(this._rotationVector.y)
    this.updateLocalMatrix()
  }

  getTransform(): MatrixArray {
    this.updateWorldMatrix()
    this.updateInverseMatrix()
    return this.worldMatrix.matrix
  }

  // Position

  set x(value: number) {
    this.setPosition(value, this.position.y)
  }
  get x(): number {
    return this.position.x
  }

  set y(value: number) {
    this.setPosition(this.position.x, value)
  }
  get y(): number {
    return this.position.y
  }

  // Origin

  set originX(value: number) {
    this.setOrigin(value, this.origin.y)
  }
  get originX(): number {
    return this.origin.x
  }

  set originY(value: number) {
    this.setOrigin(this.origin.x, value)
  }
  get originY(): number {
    return this.origin.y
  }

  // Scale

  set scaleX(value: number) {
    this.setScale(value, this.scale.y)
  }
  get scaleX(): number {
    return this.scale.x
  }

  set scaleY(value: number) {
    this.setScale(this.scale.x, value)
  }
  get scaleY(): number {
    return this.scale.y
  }

  // Rotation

  set rotation(value: number) {
    this.setRotation(value)
  }
  get rotation(): number {
    return this._rotationVector.x
  }
}
