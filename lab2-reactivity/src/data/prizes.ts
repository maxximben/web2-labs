export interface Prize {
  year: string
  category: string
  dateAwarded: string
  prizeAmount: number
}

export const prizes: Prize[] = [
  { year: '1901', category: 'Химия', dateAwarded: '1901-11-12', prizeAmount: 150782 },
  { year: '1901', category: 'Литература', dateAwarded: '1901-11-14', prizeAmount: 150782 },
  { year: '1901', category: 'Медицина', dateAwarded: '1901-10-30', prizeAmount: 150782 },
  { year: '1901', category: 'Физика', dateAwarded: '1901-11-12', prizeAmount: 150782 },
  { year: '1901', category: 'Премия мира', dateAwarded: '1901-12-10', prizeAmount: 150782 },
  { year: '1921', category: 'Физика', dateAwarded: '1922-11-09', prizeAmount: 121573 },
  { year: '1965', category: 'Физика', dateAwarded: '1965-10-21', prizeAmount: 282000 },
  { year: '2001', category: 'Экономика', dateAwarded: '2001-10-10', prizeAmount: 10000000 },
]
