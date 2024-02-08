import { Vector } from "./Vector"

export class Bounds {
  // Corner Vectors
  readonly tl = new Vector()
  readonly tr = new Vector()
  readonly bl = new Vector()
  readonly br = new Vector()

  // Size Vector
  readonly size = new Vector()

  private update() {
    const rx = this.tl.x + this.size.x
    const by = this.tl.y + this.size.y

    this.tr.set(rx, this.tl.y)
    this.bl.set(this.tl.x, by)
    this.br.set(rx, by)

    return this
  }

  copy(bounds: Bounds) {
    this.tl.copy(bounds.tl)
    this.size.copy(bounds.size)
    return this.update()
  }

  offset(x: number, y = x) {
    this.tl.x += x
    this.tl.y += y
    this.size.x -= x * 2
    this.size.y -= y * 2
    return this.update()
  }

  setPosition(x: number, y: number) {
    this.tl.x = x
    this.tl.y = y
    return this.update()
  }

  setSize(width: number, height: number) {
    this.size.x = width
    this.size.y = height
    return this.update()
  }

  set x(value: number) {
    this.setPosition(value, this.tl.y)
  }
  get x() {
    return this.tl.x
  }

  set y(value: number) {
    this.setPosition(this.tl.x, value)
  }
  get y() {
    return this.tl.y
  }

  set width(value: number) {
    this.setSize(value, this.size.y)
  }
  get width() {
    return this.size.x
  }

  set height(value: number) {
    this.setSize(this.size.x, value)
  }
  get height(): number {
    return this.size.y
  }
}
