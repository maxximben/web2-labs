<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ total: number; pageSize: number; disabled?: boolean }>()
const page = defineModel<number>('page', { required: true })

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

function go(target: number) {
  page.value = Math.min(Math.max(1, target), pageCount.value)
}
</script>

<template>
  <nav class="pagination" aria-label="Постраничная навигация">
    <button type="button" :disabled="disabled || page <= 1" @click="go(1)" aria-label="Первая страница">«</button>
    <button type="button" :disabled="disabled || page <= 1" @click="go(page - 1)">Назад</button>
    <span class="info">Страница {{ page }} из {{ pageCount }} · всего {{ total }}</span>
    <button type="button" :disabled="disabled || page >= pageCount" @click="go(page + 1)">Вперёд</button>
    <button type="button" :disabled="disabled || page >= pageCount" @click="go(pageCount)" aria-label="Последняя страница">»</button>
  </nav>
</template>

<style scoped>
.pagination { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
.info { color: var(--muted); margin: 0 8px; font-variant-numeric: tabular-nums; }
button {
  padding: 6px 14px;
  border: 1px solid var(--border);
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font: inherit;
}
button:hover:not(:disabled) { background: var(--row-hover); }
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
