import { Bounds } from "../math/Bounds"
import { Vector } from "../math/Vector"

export const pointInBounds = (point: Vector, bounds: Bounds) =>
  point.x >= bounds.tl.x &&
  point.x <= bounds.br.x &&
  point.y >= bounds.tl.y &&
  point.y <= bounds.br.y

export function pointInEllipse(
  point: Vector,
  radius: Vector,
  center: Vector = radius,
  rotation = 0, // radians
) {
  const dx = point.x - center.x
  const dy = point.y - center.y

  const rxs = radius.x * radius.x
  const rys = radius.y * radius.y

  if (!rotation || radius.x === radius.y) {
    return (dx * dx) / rxs + (dy * dy) / rys <= 1
  }

  const cos = Math.cos(rotation)
  const sin = Math.sin(rotation)

  const tx = cos * dx + sin * dy
  const ty = sin * dx - cos * dy

  return (tx * tx) / rxs + (ty * ty) / rys <= 1
}

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
