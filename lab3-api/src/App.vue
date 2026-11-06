<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <h1>Нобелевские премии</h1>
    <p>Справочник премий и лауреатов</p>
  </header>

  <nav class="site-nav" aria-label="Основная навигация">
    <ul>
      <li><RouterLink to="/prizes">Премии</RouterLink></li>
      <li><RouterLink to="/laureates">Лауреаты</RouterLink></li>
    </ul>
  </nav>

  <main class="site-main">
    <RouterView />
  </main>

  <footer class="site-footer">
    <p>Разработка web-приложений · Vue 3 + TypeScript</p>
  </footer>
</template>
