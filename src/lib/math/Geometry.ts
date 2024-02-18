import { Bounds } from "../math/Bounds"
import { Vector } from "../math/Vector"

export const pointInBounds = (point: Vector, bounds: Bounds) =>
  point.x >= bounds.tl.x &&
  point.x <= bounds.br.x &&
  point.y >= bounds.tl.y &&
  point.y <= bounds.br.y

export function pointInSuperellipse(
  exponent: number,
  point: Vector,
  radius: Vector,
  center: Vector = radius,
) {
  const dx = point.x - center.x
  const dy = point.y - center.y

  const x = Math.abs(dx / radius.x)
  const y = Math.abs(dy / radius.y)

  return x ** exponent + y ** exponent <= 1
}

export const pointInEllipse = (
  point: Vector,
  radius: Vector,
  center: Vector = radius,
) => pointInSuperellipse(2, point, radius, center)

const radiusVector = new Vector()
const innerBounds = new Bounds()

export function pointInRectangle(point: Vector, bounds: Bounds, radius = 0) {
  const inBounds = pointInBounds(point, bounds)

  if (!inBounds || radius < 5) return inBounds

  innerBounds.copy(bounds).offset(radius)
  radiusVector.set(radius, radius)

  if (point.y < innerBounds.tl.y) {
    if (point.x < innerBounds.tl.x) {
      return pointInEllipse(point, radiusVector, innerBounds.tl)
    }

    if (point.x > innerBounds.tr.x) {
      return pointInEllipse(point, radiusVector, innerBounds.tr)
    }
  } else if (point.y > innerBounds.br.y) {
    if (point.x < innerBounds.bl.x) {
      return pointInEllipse(point, radiusVector, innerBounds.bl)
    }

    if (point.x > innerBounds.br.x) {
      return pointInEllipse(point, radiusVector, innerBounds.br)
    }
  }

  return true
}
