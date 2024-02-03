import { expect, test } from "vitest"
import { degToRad } from "./math"

test("degToRad(0)", () => {
  expect(degToRad(0)).toBe(0)
})
