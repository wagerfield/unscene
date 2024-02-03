import { svgElement } from "../core/dom"
import { Scene } from "../objects/Scene"
import { Renderer, type RendererOptions } from "./Renderer"

export interface SVGRendererOptions extends RendererOptions {}

export class SVGRenderer extends Renderer {
  readonly element = svgElement("svg")
  readonly background = svgElement("rect")

  constructor(options: SVGRendererOptions = {}) {
    super(options)

    this.background.setAttribute("width", "100%")
    this.background.setAttribute("height", "100%")
    this.element.appendChild(this.background)
  }

  render(scene: Scene): void {
    console.log("render:", scene)
    if (this.fillStyle) {
      this.background.setAttribute("fill", this.fillStyle)
    }
  }

  protected onResize(width: number, height: number): void {
    console.log("resized: %s x %s", width, height, this)
  }
}
