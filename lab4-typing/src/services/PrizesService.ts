import type { HttpService } from './HttpService'
import { categoryRu } from './categories'
import { decodeOrThrow } from '../codecs/decodeOrThrow'
import { PrizesResponseC } from '../codecs/prize'
import type { Page, PrizeRow } from './types'

export interface PrizesQuery {
  offset: number
  limit: number
  category?: string
  yearFrom?: number
  yearTo?: number
}

export class PrizesService {
  constructor(private readonly http: HttpService) {}

  async getPrizes(query: PrizesQuery, signal?: AbortSignal): Promise<Page<PrizeRow>> {
    const hasYears = query.yearFrom !== undefined || query.yearTo !== undefined
    const raw = await this.http.get(
      '/nobelPrizes',
      {
        offset: query.offset,
        limit: query.limit,
        sort: 'desc',
        nobelPrizeCategory: query.category || undefined,
        // API игнорирует yearTo без nobelPrizeYear, а одиночный nobelPrizeYear — это ровно один год.
        nobelPrizeYear: hasYears ? (query.yearFrom ?? 1901) : undefined,
        yearTo: hasYears ? (query.yearTo ?? 2100) : undefined,
      },
      signal,
    )

    const data = decodeOrThrow(PrizesResponseC, raw)

    return {
      total: data.meta.count,
      items: data.nobelPrizes.map((p) => ({
        key: `${p.category.en}-${p.awardYear}`,
        year: p.awardYear,
        category: categoryRu(p.category.en),
        dateAwarded: p.dateAwarded,
        prizeAmount: p.prizeAmount,
      })),
    }
  }
}
