export const PI = Math.PI
export const PI2 = PI * 2
export const PIH = PI / 2

/**
 * Converts degrees to radians.
 * @param degrees Degrees to convert.
 * @returns Radians.
 */
export const degToRad = (degrees: number) => degrees * (PI / 180)

/**
 * Converts radians to degrees.
 * @param radians Radians to convert.
 * @returns Degrees.
 */
export const radToDeg = (radians: number) => radians * (180 / PI)

/**
 * Clamps a value within a specified range.
 * @param {Number} value Value to clamp.
 * @param {Number} min Lower limit of the range.
 * @param {Number} max Upper limit of the range.
 * @return {Number} Clamped value.
 */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

/**
 * Determines the sign of a value as either +1 or -1.
 * @param {Number} value Value to determine the sign of.
 * @return {Number} Sign of the given value.
 */
export const sign = (value: number) => (value >= 0 ? 1 : -1)

/**
 * Normalizes a value to a given scale.
 * @param {Number} value Value to plot on the given scale.
 * @param {Number} min Optional lower limit of the scale. Defaults to 0.
 * @param {Number} max Optional upper limit of the scale. Defaults to 1.
 * @return {Number} Normalized value.
 */
export const normalize = (value: number, min = 0, max = 1) =>
  (value - min) / (max - min)

/**
 * Maps a value to a given scale.
 * @param {Number} value Location on the scale. Typically a ratio (0-1).
 * @param {Number} min Lower limit of the scale.
 * @param {Number} max Upper limit of the scale.
 * @return {Number} Mapped value.
 */
export const interpolate = (value: number, min: number, max: number) =>
  min + (max - min) * value

/**
 * Maps a value from one scale to another scale.
 * @param {Number} value Value to map.
 * @param {Number} min1 Lower limit of the source scale.
 * @param {Number} max1 Upper limit of the source scale.
 * @param {Number} min2 Lower limit of the target scale.
 * @param {Number} max2 Upper limit of the target scale.
 * @return {Number} Mapped value.
 */
export const mapScale = (
  value: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number,
) => interpolate(normalize(value, min1, max1), min2, max2)
