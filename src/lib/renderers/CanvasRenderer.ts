import { px } from "../core/utils"
import { clamp } from "../core/math"
import { htmlElement } from "../core/dom"
import { Renderer, type RendererOptions } from "./Renderer"

export interface CanvasRendererOptions extends RendererOptions {
  scale?: number
}

export abstract class CanvasRenderer extends Renderer {
  readonly element = htmlElement("canvas")

  private _maxScale = devicePixelRatio ?? 1
  private _minScale = 1
  private _scale = 0

  constructor(options: CanvasRendererOptions = {}) {
    super(options)
    this.scale = options.scale ?? this._maxScale
  }

  protected onResize(width: number, height: number) {
    this.element.style.width = px(width)
    this.element.style.height = px(height)

    this.element.width = width * this.scale
    this.element.height = height * this.scale
  }

  get scale(): number {
    return this._scale
  }
  set scale(value: number) {
    if (this._scale === value) return
    this._scale = clamp(value, this._minScale, this._maxScale)
    this.onResize(this.width, this.height)
  }
}
