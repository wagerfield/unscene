import { Scene } from "../objects/Scene"
import { assertNull } from "../core/assert"
import { CanvasRenderer, type CanvasRendererOptions } from "./CanvasRenderer"

// https://codelabs.developers.google.com/your-first-webgpu-app

export interface WebGPURendererOptions extends CanvasRendererOptions {}

export class WebGPURenderer extends CanvasRenderer {
  private readonly _context = assertNull(this.element.getContext("webgpu"))
  private _adapter: GPUAdapter | null = null

  constructor(options: WebGPURendererOptions = {}) {
    super(options)
    this.configure()
  }

  private async configure() {
    if (!navigator.gpu) throw new Error("WebGPU not supported")

    this._adapter = await navigator.gpu.requestAdapter()

    if (!this._adapter) throw new Error("GPU adapter not available")

    this._context.configure({
      device: await this._adapter.requestDevice(),
      format: navigator.gpu.getPreferredCanvasFormat(),
    })
  }

  render(scene: Scene): void {}
}
