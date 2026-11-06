import * as t from 'io-ts'

export const LocalizedStringC = t.type({
  en: t.string,
})

export const MetaC = t.type({
  offset: t.number,
  limit: t.number,
  count: t.number,
})

export const DateAndPlaceC = t.partial({
  date: t.string,
})
