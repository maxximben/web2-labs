const dateFmt = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
const numFmt = new Intl.NumberFormat('ru-RU')

/** '2001-10-10' -> '10.10.2001'; частичные даты вида '1863-00-00' -> '1863'. */
export function formatDate(iso: string | undefined): string {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  if (!y) return '—'
  if (!m || m === '00') return y
  if (!d || d === '00') return `${m}.${y}`
  return dateFmt.format(new Date(Number(y), Number(m) - 1, Number(d)))
}

export function formatNumber(n: number | undefined): string {
  return n === undefined ? '—' : numFmt.format(n)
}
