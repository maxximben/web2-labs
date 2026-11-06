/** Описание колонки универсальной таблицы. */
export interface Column<T> {
  /** Уникальный ключ колонки (используется и для имени слота `cell-<key>`). */
  key: string
  title: string
  /** Как получить значение ячейки из строки. */
  value: (row: T) => string | number
  numeric?: boolean
}
