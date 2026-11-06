import { createRouter, createWebHistory } from 'vue-router'
import PrizesView from './views/PrizesView.vue'
import LaureatesView from './views/LaureatesView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/prizes' },
    { path: '/prizes', name: 'prizes', component: PrizesView, meta: { title: 'Премии' } },
    { path: '/laureates', name: 'laureates', component: LaureatesView, meta: { title: 'Лауреаты' } },
  ],
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? ''} · Нобелевские премии`
})
