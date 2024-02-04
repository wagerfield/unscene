import { assertNull } from "../core/assert"
import { each } from "../core/loop"
import { PI2 } from "../core/math"

import { Node } from "../objects/Node"
import { Scene } from "../objects/Scene"

import { Shape } from "../shapes/Shape"
import { Point } from "../shapes/Point"
import { Ellipse } from "../shapes/Ellipse"
import { Rectangle } from "../shapes/Rectangle"

import { CanvasRenderer } from "./CanvasRenderer"

export class Canvas2DRenderer extends CanvasRenderer {
  private readonly _context = assertNull(
    this.element.getContext("2d", {
      alpha: false,
    }),
  )

  private renderChild = (node: Node) => {
    if (node.hidden) return

    this._context.setTransform(...node.getTransform())

    if (node instanceof Shape) {
      this._context.beginPath()
    }

    if (node instanceof Point) {
      this._context.ellipse(0, 0, node.radius, node.radius, 0, 0, PI2)
    }

    if (node instanceof Ellipse) {
      const rx = node.radiusX
      const ry = node.radiusY
      this._context.ellipse(rx, ry, rx, ry, 0, 0, PI2)
    }

    if (node instanceof Rectangle) {
      this._context.roundRect(0, 0, node.width, node.height, node.radius)
    }

    if (node instanceof Shape) {
      if (node.fillStyle) {
        this._context.fillStyle = node.fillStyle
        this._context.fill()
      }

      if (node.lineStyle) {
        this._context.strokeStyle = node.lineStyle
        this._context.lineWidth = node.lineWidth
        this._context.lineJoin = node.lineJoin
        this._context.lineCap = node.lineCap
        this._context.stroke()
      }
    }

    each(node.children, this.renderChild)
  }

  render(scene: Scene): void {
    this._context.reset()
    scene.setScale(this.scale)
    this.renderChild(scene)
  }
}
