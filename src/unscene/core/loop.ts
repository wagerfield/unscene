export type Iterator<T, U> = (
  item: T,
  index: number,
  length: number,
  list: T[]
) => U

export function each<T, U>(list: T[], fn: Iterator<T, U>): void {
  for (let i = 0, l = list.length; i < l; ++i) fn(list[i], i, l, list)
}

export function map<T, U>(list: T[], fn: Iterator<T, U>): U[] {
  const result: U[] = []
  each(list, (item, index, length) => {
    result.push(fn(item, index, length, list))
  })
  return result
}
