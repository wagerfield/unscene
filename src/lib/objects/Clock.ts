import { caf, raf } from "../core/utils"
import { Emitter } from "./Emitter"

export interface ClockContext {
  frame: number
  delta: number
  time: number
}

export interface ClockOptions {
  autostart?: boolean
}

export interface ClockEvents {
  start: never
  stop: never
  tick: ClockContext
}

export class Clock extends Emitter<ClockEvents> {
  private _frameId = 0
  private _running = false
  private _context: ClockContext = {
    frame: 0,
    delta: 0,
    time: 0,
  }

  constructor(options: ClockOptions = {}) {
    super()
    if (options.autostart) this.start()
  }

  private tick = (time: number) => {
    this._frameId = raf(this.tick)
    this._context.frame += 1
    this._context.delta = time - this._context.time
    this._context.time = time
    this.emit("tick", this._context)
  }

  start = () => {
    if (this._running) return
    this._running = true
    this._frameId = raf(this.tick)
    this.emit("start")
  }

  stop = () => {
    if (!this._running) return
    this._running = false
    caf(this._frameId)
    this.emit("stop")
  }

  toggle = () => {
    this._running ? this.stop() : this.start()
  }

  get running(): boolean {
    return this._running
  }
}
