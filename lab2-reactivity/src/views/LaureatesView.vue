<script setup lang="ts">
import DataTable from '../components/DataTable.vue'
import type { Column } from '../components/types'
import { laureates, type Laureate } from '../data/laureates'
import { formatDate } from '../format'

const columns: Column<Laureate>[] = [
  { key: 'name', title: 'Имя / название', value: (l) => l.name },
  { key: 'birth', title: 'Дата рождения / основания', value: (l) => formatDate(l.birthOrFounded) },
  { key: 'prizes', title: 'Число премий', value: (l) => l.prizesCount, numeric: true },
]
</script>

<template>
  <h2>Список лауреатов</h2>
  <DataTable
    :columns="columns"
    :rows="laureates"
    :row-key="(l) => l.id"
    caption="Избранные лауреаты и организации"
  />
</template>
