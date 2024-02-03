import type { FillStyle, LineCap, LineJoin } from "../core/types"
import { Node, type NodeOptions } from "../objects/Node"
import { Bounds } from "../math/Bounds"
import { Vector } from "../math/Vector"

export interface ShapeOptions extends NodeOptions {
  fillStyle?: FillStyle
  lineStyle?: FillStyle
  lineWidth?: number
  lineJoin?: LineJoin
  lineCap?: LineCap
}

export abstract class Shape extends Node {
  protected _bounds = new Bounds()
  protected _point = new Vector()

  public fillStyle: FillStyle
  public lineStyle: FillStyle
  public lineWidth: number
  public lineJoin: LineJoin
  public lineCap: LineCap

  constructor({
    fillStyle = "#000",
    lineStyle = null,
    lineWidth = 1,
    lineJoin = "miter",
    lineCap = "round",
    ...options
  }: ShapeOptions = {}) {
    super(options)

    this.fillStyle = fillStyle
    this.lineStyle = lineStyle
    this.lineWidth = lineWidth
    this.lineJoin = lineJoin
    this.lineCap = lineCap
  }
}
