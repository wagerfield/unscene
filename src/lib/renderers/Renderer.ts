import type { FillStyle } from "../core/types"
import { Scene } from "../objects/Scene"

export interface RendererOptions {
  width?: number
  height?: number
  fillStyle?: FillStyle
}

export abstract class Renderer {
  abstract readonly element: Element

  private _fillStyle: FillStyle
  private _width: number
  private _height: number

  constructor(options: RendererOptions = {}) {
    this._width = options.width ?? 320
    this._height = options.height ?? 240
    this._fillStyle = options.fillStyle ?? null
  }

  public abstract render(scene: Scene): void

  protected abstract onResize(width: number, height: number): void

  set width(value: number) {
    if (this._width === value) return
    this.onResize((this._width = value), this._height)
  }
  get width(): number {
    return this._width
  }

  set height(value: number) {
    if (this._height === value) return
    this.onResize(this._width, (this._height = value))
  }
  get height(): number {
    return this._height
  }

  set fillStyle(value: FillStyle) {
    if (this._fillStyle === value) return
    this._fillStyle = value
  }
  get fillStyle(): FillStyle {
    return this._fillStyle
  }
}
