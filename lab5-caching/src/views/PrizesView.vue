<script setup lang="ts">
import { ref } from 'vue'
import DataTable from '../components/DataTable.vue'
import Pagination from '../components/Pagination.vue'
import type { Column } from '../components/types'
import { usePagedData } from '../composables/usePagedData'
import { formatDate, formatNumber } from '../format'
import { CATEGORIES } from '../services/categories'
import { prizesService } from '../services'
import type { PrizeRow } from '../services/types'

const filters = ref({
  category: '',
  yearFrom: '' as number | '',
  yearTo: '' as number | '',
})

const { rows, total, page, pageSize, loading, error } = usePagedData(filters, ({ offset, limit, filters: f }, signal) =>
  prizesService.getPrizes(
    {
      offset,
      limit,
      category: f.category || undefined,
      yearFrom: f.yearFrom === '' ? undefined : f.yearFrom,
      yearTo: f.yearTo === '' ? undefined : f.yearTo,
    },
    signal,
  ),
)

const columns: Column<PrizeRow>[] = [
  { key: 'category', title: 'Категория', value: (p) => `${p.category}, ${p.year}` },
  { key: 'date', title: 'Дата вручения', value: (p) => formatDate(p.dateAwarded) },
  { key: 'amount', title: 'Стоимость гранта (SEK)', value: (p) => formatNumber(p.prizeAmount), numeric: true },
]

function reset() {
  filters.value = { category: '', yearFrom: '', yearTo: '' }
}
</script>

<template>
  <h2>Список Нобелевских премий</h2>

  <form class="filters" @submit.prevent>
    <label>
      Категория
      <select v-model="filters.category">
        <option value="">Все</option>
        <option v-for="c in CATEGORIES" :key="c.code" :value="c.code">{{ c.ru }}</option>
      </select>
    </label>
    <label>
      Год с
      <input v-model.number.lazy="filters.yearFrom" type="number" min="1901" max="2100" placeholder="1901" />
    </label>
    <label>
      Год по
      <input v-model.number.lazy="filters.yearTo" type="number" min="1901" max="2100" placeholder="2100" />
    </label>
    <button type="button" @click="reset">Сбросить</button>
  </form>

  <DataTable
    :columns="columns"
    :rows="rows"
    :row-key="(p) => p.key"
    :loading="loading"
    :error="error"
    empty-text="По заданным фильтрам премий не найдено"
  />
  <Pagination v-model:page="page" :total="total" :page-size="pageSize" :disabled="loading" />
</template>
