export interface ArrayLike<T> {
  length: number
  [index: number]: T
}

export type Iterator<T, U> = (
  item: T,
  index: number,
  length: number,
  array: ArrayLike<T>,
) => U

export function eachBy<T, U>(
  inc: number,
  arr: ArrayLike<T>,
  fn: Iterator<T, U>,
): void {
  for (let i = 0, l = arr.length; i < l; i += inc) fn(arr[i], i, l, arr)
}

export const each = <T, U>(array: ArrayLike<T>, fn: Iterator<T, U>) =>
  eachBy(1, array, fn)

export function map<T, U>(array: ArrayLike<T>, fn: Iterator<T, U>): U[] {
  const result: U[] = []
  each(array, (item, index, length) => {
    result.push(fn(item, index, length, array))
  })
  return result
}
