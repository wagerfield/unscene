import type { AnyFunction } from "../core/types"

export type EmitterHandler<Data> = (data: Data) => void

export abstract class Emitter<EventMap> {
  private _map = new Map<keyof EventMap, Set<AnyFunction>>()

  on<EventName extends keyof EventMap>(
    event: EventName,
    handler: EmitterHandler<EventMap[EventName]>,
  ): void {
    const handlers = this._map.get(event) || new Set()
    this._map.set(event, handlers)
    handlers.add(handler)
  }

  off<EventName extends keyof EventMap>(
    event: EventName,
    handler: EmitterHandler<EventMap[EventName]>,
  ): void {
    this._map.get(event)?.delete(handler)
  }

  protected emit<EventName extends keyof EventMap>(event: EventName): void
  protected emit<EventName extends keyof EventMap>(
    event: EventName,
    data: EventMap[EventName] extends never ? never : EventMap[EventName],
  ): void
  protected emit<EventName extends keyof EventMap>(
    event: EventName,
    data?: EventMap[EventName],
  ): void {
    this._map.get(event)?.forEach((handler) => handler(data))
  }
}
