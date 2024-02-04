import { isNull, isUndefined } from "./guard"
import type { Nil } from "./types"

export function assertUndefined<T>(
  value: T | undefined,
  error = "value undefined",
): T {
  if (!isUndefined(value)) return value
  throw new Error(error)
}

export function assertNull<T>(value: T | null, error = "value is null"): T {
  if (!isNull(value)) return value
  throw new Error(error)
}

export function assertNil<T>(value: T | Nil, error?: string): T {
  return assertUndefined(assertNull(value, error), error)
}
