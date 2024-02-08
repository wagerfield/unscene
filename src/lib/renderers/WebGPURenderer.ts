import { Scene } from "../objects/Scene"
import { assertNil, assertNull } from "../core/assert"
import { CanvasRenderer, type CanvasRendererOptions } from "./CanvasRenderer"

// https://codelabs.developers.google.com/your-first-webgpu-app

export interface WebGPURendererOptions extends CanvasRendererOptions {}

export class WebGPURenderer extends CanvasRenderer {
  private readonly _context = assertNull(this.element.getContext("webgpu"))

  private _gpu = assertNil(navigator.gpu, "WebGPU not supported")
  private _adapter: GPUAdapter | null = null
  private _device: GPUDevice | null = null
  private _format: GPUTextureFormat | null = null

  constructor(options: WebGPURendererOptions = {}) {
    super(options)
    this.setup()
  }

  private async setup() {
    this._adapter = await this._gpu.requestAdapter()

    if (!this._adapter) throw new Error("GPU adapter not available")

    this._device = await this._adapter.requestDevice()

    if (!this._device) throw new Error("GPU device not available")

    this._format = this._gpu.getPreferredCanvasFormat()

    this._context.configure({
      device: this._device,
      format: this._format,
    })
  }

  render(scene: Scene): void {}
}
