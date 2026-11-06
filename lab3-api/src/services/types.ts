/** Ответы Nobel Prize API v2.1 (только те поля, которые использует приложение). */

export interface LocalizedString {
  en: string
}

export interface ApiMeta {
  offset: number
  limit: number
  count: number
}

export interface ApiPrize {
  awardYear: string
  category: LocalizedString
  /** Отсутствует у лет, когда премия не вручалась. */
  dateAwarded?: string
  prizeAmount?: number
}

export interface ApiPrizesResponse {
  nobelPrizes: ApiPrize[]
  meta: ApiMeta
}

export interface ApiDateAndPlace {
  date?: string
}

export interface ApiLaureate {
  id: string
  /** Есть у людей. */
  fullName?: LocalizedString
  /** Есть у организаций. */
  orgName?: LocalizedString
  birth?: ApiDateAndPlace
  founded?: ApiDateAndPlace
  nobelPrizes: { awardYear: string }[]
}

export interface ApiLaureatesResponse {
  laureates: ApiLaureate[]
  meta: ApiMeta
}

/* ---------- модели для таблиц ---------- */

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
