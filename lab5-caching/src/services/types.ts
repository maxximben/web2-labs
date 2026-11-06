/** Модели для таблиц. Типы ответов API выводятся из кодеков (см. src/codecs). */

export interface Page<T> {
  items: T[]
  total: number
}

export interface PrizeRow {
  key: string
  year: string
  category: string
  dateAwarded: string | undefined
  prizeAmount: number | undefined
}

export interface LaureateRow {
  id: string
  name: string
  birthOrFounded: string | undefined
  prizesCount: number
}
