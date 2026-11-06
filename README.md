# Лабораторные работы по разработке web-приложений

Каждая лаба — отдельная папка; лабы 2–5 наращивают одна другую (стек: Vue 3 + TypeScript + Vite).

| Папка | Что внутри | Запуск |
|-------|-----------|--------|
| `lab1-html-css` | `prizes.html`, `laureats.html`, `style.css` — семантическая вёрстка таблиц | открыть `prizes.html` в браузере |
| `lab2-reactivity` | SPA, Vue Router, переиспользуемый `DataTable`, статические данные | `npm i && npm run dev` |
| `lab3-api` | `HttpService` (axios), `PrizesService`, `LaureatesService`, серверные пагинация и фильтры (Nobel Prize API 2.1) | `npm i && npm run dev` |
| `lab4-typing` | кодеки `io-ts` (`src/codecs`), `decodeOrThrow` на `fp-ts` | `npm i && npm run dev` |
| `lab5-caching` | PWA: `src/sw.ts` (Workbox), precache оболочки, NetworkFirst для API, плашка офлайн-режима, обновление при возврате сети | `npm i && npm run build && npm run preview` |

Service worker в lab5 проверять через `build` + `preview` (или `dev`, там включён `devOptions`),
затем в DevTools → Network → Offline.
Офлайн доступны только те страницы/фильтры, которые уже открывались при наличии сети.
