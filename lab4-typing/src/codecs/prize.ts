import * as t from 'io-ts'
import { LocalizedStringC, MetaC } from './common'

export const PrizeC = t.intersection([
  t.type({
    awardYear: t.string,
    category: LocalizedStringC,
  }),
  // В годы, когда премия не присуждалась, этих полей нет.
  t.partial({
    dateAwarded: t.string,
    prizeAmount: t.number,
  }),
])

export const PrizesResponseC = t.type({
  nobelPrizes: t.array(PrizeC),
  meta: MetaC,
})

export type ApiPrize = t.TypeOf<typeof PrizeC>
export type ApiPrizesResponse = t.TypeOf<typeof PrizesResponseC>
