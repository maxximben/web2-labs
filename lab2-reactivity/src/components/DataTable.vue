<script setup lang="ts" generic="T">
import type { Column } from './types'

const props = withDefaults(
  defineProps<{
    columns: Column<T>[]
    rows: T[]
    rowKey: (row: T) => string | number
    caption?: string
    emptyText?: string
  }>(),
  { emptyText: 'Нет данных' },
)

function cell(row: T, col: Column<T>): string | number {
  return col.value(row)
}
</script>

<template>
  <table class="data-table">
    <caption v-if="props.caption">{{ props.caption }}</caption>
    <thead>
      <tr>
        <th
          v-for="col in props.columns"
          :key="col.key"
          scope="col"
          :class="{ num: col.numeric }"
        >
          {{ col.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.rows" :key="props.rowKey(row)">
        <td v-for="col in props.columns" :key="col.key" :class="{ num: col.numeric }">
          <slot :name="`cell-${col.key}`" :row="row" :value="cell(row, col)">
            {{ cell(row, col) }}
          </slot>
        </td>
      </tr>
      <tr v-if="props.rows.length === 0">
        <td class="empty" :colspan="props.columns.length">{{ props.emptyText }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
}
caption {
  caption-side: top;
  text-align: left;
  padding-bottom: 8px;
  color: var(--muted);
}
th,
td {
  border: 1px solid var(--border);
  padding: 10px 14px;
  text-align: left;
}
thead th {
  background: var(--header-bg);
  color: #fff;
  border-color: var(--header-bg);
  font-weight: 600;
}
tbody tr:nth-child(even) { background: var(--row-alt); }
tbody tr:hover { background: var(--row-hover); }
.num { text-align: right; font-variant-numeric: tabular-nums; }
.empty { text-align: center; color: var(--muted); padding: 24px; }
</style>
