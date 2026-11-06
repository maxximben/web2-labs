import { ref, watch, type Ref } from 'vue'
import { isRequestCancelled } from '../services/HttpService'
import type { Page } from '../services/types'

export interface PageRequest<F> {
  offset: number
  limit: number
  filters: F
}

/**
 * Серверная пагинация + фильтрация.
 * Перезагружает данные при смене страницы или фильтров; при смене фильтров возвращается на 1-ю страницу;
 * устаревшие запросы отменяются.
 */
export function usePagedData<T, F extends object>(
  filters: Ref<F>,
  fetcher: (request: PageRequest<F>, signal: AbortSignal) => Promise<Page<T>>,
  pageSize = 10,
) {
  const rows = ref<T[]>([]) as Ref<T[]>
  const total = ref(0)
  const page = ref(1)
  const loading = ref(false)
  const error = ref<string | null>(null)

  let controller: AbortController | null = null

  async function load() {
    controller?.abort()
    const current = (controller = new AbortController())
    loading.value = true
    error.value = null
    try {
      const result = await fetcher(
        { offset: (page.value - 1) * pageSize, limit: pageSize, filters: filters.value },
        current.signal,
      )
      rows.value = result.items
      total.value = result.total
    } catch (e) {
      if (isRequestCancelled(e)) return
      console.error(e)
      rows.value = []
      total.value = 0
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      if (controller === current) loading.value = false
    }
  }

  // Сброс страницы объявлен раньше загрузки, поэтому при смене фильтров load выполнится один раз уже для страницы 1.
  watch(filters, () => (page.value = 1), { deep: true })
  watch([page, filters], load, { deep: true, immediate: true })

  return { rows, total, page, pageSize, loading, error, reload: load }
}
