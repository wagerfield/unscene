import type { AnyFunction, AnyObject, Nil } from "./types"

export const isArray = Array.isArray

export const isObject = (value: unknown): value is AnyObject =>
  value != null && typeof value === "object" && !isArray(value)

export const isFunction = (value: unknown): value is AnyFunction =>
  typeof value === "function"

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean"

export const isNumber = (value: unknown): value is number =>
  typeof value === "number"

export const isString = (value: unknown): value is string =>
  typeof value === "string"

export const isNull = (value: unknown): value is null => value === null

export const isUndefined = (value: unknown): value is undefined =>
  value === undefined

export const isNil = (value: unknown): value is Nil =>
  isNull(value) || isUndefined(value)
