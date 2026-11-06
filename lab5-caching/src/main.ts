import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style.css'
import { registerSW } from 'virtual:pwa-register'

createApp(App).use(router).mount('#app')

// Регистрация service worker (src/sw.ts); обновления подхватываются автоматически.
registerSW({ immediate: true })
