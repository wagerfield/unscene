import { uid } from "../core/utils"

export interface ContainerOptions {
  name?: string
}

export abstract class Container<T extends Container<any>> {
  readonly id = uid()

  public name: string

  private _parent: T | null = null
  private _children: T[] = []

  constructor(options: ContainerOptions = {}) {
    this.name = options.name ?? ""
  }

  get parent(): T | null {
    return this._parent
  }

  get children(): T[] {
    return this._children
  }

  getChildAt(index: number): T | null {
    return this.children[index] ?? null
  }

  getChildIndex(child: T): number {
    return this.children.indexOf(child)
  }

  addChild(child: T): void {
    child.detach()
    child._parent = this
    this.children.push(child)
  }

  addChildAt(child: T, index: number): void {
    child.detach()
    child._parent = this
    this.children.splice(index, 0, child)
  }

  removeChild(child: T): void {
    const index = this.getChildIndex(child)
    if (index !== -1) {
      child._parent = null
      this.children.splice(index, 1)
    }
  }

  removeChildAt(index: number): void {
    const child = this.getChildAt(index)
    if (child) this.removeChild(child)
  }

  clear(): void {
    this.children.forEach((child) => child.detach())
  }

  detach(): void {
    if (this.parent) {
      this.parent.removeChild(this)
    }
  }

  clone(): this {
    return Object.create(this)
  }

  destroy(): void {
    this.clear()
    this.detach()
  }
}
