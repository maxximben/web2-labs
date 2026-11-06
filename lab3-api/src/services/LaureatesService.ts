import type { HttpService } from './HttpService'
import type { ApiLaureatesResponse, LaureateRow, Page } from './types'

export interface LaureatesQuery {
  offset: number
  limit: number
  name?: string
  gender?: string
  category?: string
}

export class LaureatesService {
  constructor(private readonly http: HttpService) {}

  async getLaureates(query: LaureatesQuery, signal?: AbortSignal): Promise<Page<LaureateRow>> {
    const data = await this.http.get<ApiLaureatesResponse>(
      '/laureates',
      {
        offset: query.offset,
        limit: query.limit,
        name: query.name?.trim() || undefined,
        gender: query.gender || undefined,
        nobelPrizeCategory: query.category || undefined,
      },
      signal,
    )

    return {
      total: data.meta.count,
      items: data.laureates.map((l) => ({
        id: l.id,
        name: l.fullName?.en ?? l.orgName?.en ?? `Лауреат #${l.id}`,
        birthOrFounded: l.birth?.date ?? l.founded?.date,
        prizesCount: l.nobelPrizes.length,
      })),
    }
  }
}
