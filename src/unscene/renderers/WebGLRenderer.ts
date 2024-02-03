import { Scene } from "../objects/Scene"
import { assertNull } from "../core/assert"
import { CanvasRenderer, type CanvasRendererOptions } from "./CanvasRenderer"

export interface WebGLRendererOptions extends CanvasRendererOptions {}

export class WebGLRenderer extends CanvasRenderer {
  private readonly _context = assertNull(this.element.getContext("webgl"))

  constructor(options: WebGLRendererOptions = {}) {
    super(options)
  }

  render(scene: Scene): void {}
}
