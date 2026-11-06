<script setup lang="ts">
import { ref, watch } from 'vue'
import DataTable from '../components/DataTable.vue'
import Pagination from '../components/Pagination.vue'
import type { Column } from '../components/types'
import { usePagedData } from '../composables/usePagedData'
import { formatDate } from '../format'
import { CATEGORIES } from '../services/categories'
import { laureatesService } from '../services'
import type { LaureateRow } from '../services/types'

const filters = ref({ name: '', gender: '', category: '' })

// Поле поиска обновляет фильтр с задержкой, чтобы не слать запрос на каждую букву.
const nameInput = ref('')
let timer: ReturnType<typeof setTimeout> | undefined
watch(nameInput, (value) => {
  clearTimeout(timer)
  timer = setTimeout(() => (filters.value.name = value), 400)
})

const { rows, total, page, pageSize, loading, error } = usePagedData(filters, ({ offset, limit, filters: f }, signal) =>
  laureatesService.getLaureates(
    { offset, limit, name: f.name, gender: f.gender, category: f.category },
    signal,
  ),
)

const columns: Column<LaureateRow>[] = [
  { key: 'name', title: 'Имя / название', value: (l) => l.name },
  { key: 'birth', title: 'Дата рождения / основания', value: (l) => formatDate(l.birthOrFounded) },
  { key: 'prizes', title: 'Число премий', value: (l) => l.prizesCount, numeric: true },
]

function reset() {
  clearTimeout(timer)
  nameInput.value = ''
  filters.value = { name: '', gender: '', category: '' }
}
</script>

<template>
  <h2>Список лауреатов</h2>

  <form class="filters" @submit.prevent>
    <label>
      Имя / название
      <input v-model="nameInput" type="search" placeholder="Например, Curie" />
    </label>
    <label>
      Пол
      <select v-model="filters.gender">
        <option value="">Любой</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>
    </label>
    <label>
      Категория
      <select v-model="filters.category">
        <option value="">Все</option>
        <option v-for="c in CATEGORIES" :key="c.code" :value="c.code">{{ c.ru }}</option>
      </select>
    </label>
    <button type="button" @click="reset">Сбросить</button>
  </form>

  <DataTable
    :columns="columns"
    :rows="rows"
    :row-key="(l) => l.id"
    :loading="loading"
    :error="error"
    empty-text="Лауреатов по заданным фильтрам не найдено"
  />
  <Pagination v-model:page="page" :total="total" :page-size="pageSize" :disabled="loading" />
</template>
