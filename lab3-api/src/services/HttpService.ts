import axios, { type AxiosInstance } from 'axios'

/**
 * Единая точка для всех HTTP-запросов приложения.
 * Прикладные сервисы (PrizesService, LaureatesService) не знают про axios.
 */
export class HttpService {
  private readonly client: AxiosInstance

  constructor(baseURL: string, timeout = 15_000) {
    this.client = axios.create({ baseURL, timeout })
  }

  /** GET-запрос; параметры со значением undefined в URL не попадают. */
  async get<T = unknown>(
    url: string,
    params?: Record<string, string | number | undefined>,
    signal?: AbortSignal,
  ): Promise<T> {
    const response = await this.client.get<T>(url, { params, signal })
    return response.data
  }
}

export { isCancel as isRequestCancelled } from 'axios'
