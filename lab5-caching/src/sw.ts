/// <reference lib="webworker" />
import { clientsClaim, type WorkboxPlugin } from 'workbox-core'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<string | { url: string; revision: string | null }>
}

const API_ORIGIN = 'https://api.nobelprize.org'
const API_CACHE = 'nobel-api-v1'
const CHANNEL = 'nobel-sw'

// ---------- жизненный цикл ----------
self.skipWaiting()
clientsClaim()

// ---------- 1. Оболочка приложения (HTML/JS/CSS/иконки) — precache ----------
precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// SPA: любой переход по адресу (например, /laureates при открытии без сети) отдаёт закешированный index.html
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')))

// ---------- 2. Данные API — network first с откатом на кеш ----------
const channel = new BroadcastChannel(CHANNEL)

/** Сообщает странице, что ответ взят из кеша (сеть недоступна), чтобы показать плашку. */
const notifyWhenServedFromCache: WorkboxPlugin = {
  cachedResponseWillBeUsed: async ({ cachedResponse }) => {
    if (cachedResponse) channel.postMessage({ type: 'served-from-cache' })
    return cachedResponse
  },
}

registerRoute(
  ({ url, request }) => url.origin === API_ORIGIN && request.method === 'GET',
  new NetworkFirst({
    cacheName: API_CACHE,
    // Если сеть не ответила за 5 с (слабое соединение) — берём кеш, а не ждём.
    networkTimeoutSeconds: 5,
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 300, maxAgeSeconds: 7 * 24 * 60 * 60 }),
      notifyWhenServedFromCache,
    ],
  }),
)
