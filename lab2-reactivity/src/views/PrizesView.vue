<script setup lang="ts">
import DataTable from '../components/DataTable.vue'
import type { Column } from '../components/types'
import { prizes, type Prize } from '../data/prizes'
import { formatDate, formatNumber } from '../format'

const columns: Column<Prize>[] = [
  { key: 'category', title: 'Категория', value: (p) => `${p.category}, ${p.year}` },
  { key: 'date', title: 'Дата вручения', value: (p) => formatDate(p.dateAwarded) },
  { key: 'amount', title: 'Стоимость гранта (SEK)', value: (p) => formatNumber(p.prizeAmount), numeric: true },
]
</script>

<template>
  <h2>Список Нобелевских премий</h2>
  <DataTable
    :columns="columns"
    :rows="prizes"
    :row-key="(p) => `${p.category}-${p.year}`"
    caption="Избранные премии"
  />
</template>
