/** Код категории в API -> название (en из ответа API) -> русское название. */
export const CATEGORIES = [
  { code: 'phy', en: 'Physics', ru: 'Физика' },
  { code: 'che', en: 'Chemistry', ru: 'Химия' },
  { code: 'med', en: 'Physiology or Medicine', ru: 'Медицина' },
  { code: 'lit', en: 'Literature', ru: 'Литература' },
  { code: 'pea', en: 'Peace', ru: 'Премия мира' },
  { code: 'eco', en: 'Economic Sciences', ru: 'Экономика' },
] as const

export function categoryRu(en: string): string {
  return CATEGORIES.find((c) => c.en === en)?.ru ?? en
}
