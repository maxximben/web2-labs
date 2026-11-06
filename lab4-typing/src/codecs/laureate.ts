import * as t from 'io-ts'
import { DateAndPlaceC, LocalizedStringC, MetaC } from './common'

export const LaureateC = t.intersection([
  t.type({
    id: t.string,
    nobelPrizes: t.array(t.type({ awardYear: t.string })),
  }),
  t.partial({
    /** Есть у людей. */
    fullName: LocalizedStringC,
    /** Есть у организаций. */
    orgName: LocalizedStringC,
    birth: DateAndPlaceC,
    founded: DateAndPlaceC,
  }),
])

export const LaureatesResponseC = t.type({
  laureates: t.array(LaureateC),
  meta: MetaC,
})

export type ApiLaureate = t.TypeOf<typeof LaureateC>
export type ApiLaureatesResponse = t.TypeOf<typeof LaureatesResponseC>
