import { computed, ref } from 'vue'

/** Имя канала должно совпадать с CHANNEL в src/sw.ts. */
const CHANNEL = 'nobel-sw'

export const isOnline = ref(navigator.onLine)
/** true, если последний запрос к API service worker обслужил из кеша. */
export const servedFromCache = ref(false)

window.addEventListener('online', () => (isOnline.value = true))
window.addEventListener('offline', () => (isOnline.value = false))

if ('BroadcastChannel' in window) {
  new BroadcastChannel(CHANNEL).onmessage = (event: MessageEvent<{ type?: string }>) => {
    if (event.data?.type === 'served-from-cache') servedFromCache.value = true
  }
}

/** Вызывается перед каждым запросом: статус «из кеша» актуален только для последней загрузки. */
export function resetCacheFlag() {
  servedFromCache.value = false
}

export const connectionNotice = computed(() => {
  if (!isOnline.value) return 'Нет подключения к сети. Показаны сохранённые данные — после восстановления связи они обновятся.'
  if (servedFromCache.value) return 'Сервер недоступен. Показаны ранее сохранённые данные.'
  return null
})
