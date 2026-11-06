export interface Laureate {
  id: string
  name: string
  birthOrFounded: string
  prizesCount: number
}

export const laureates: Laureate[] = [
  { id: '6', name: 'Мария Склодовская-Кюри', birthOrFounded: '1867-11-07', prizesCount: 2 },
  { id: '26', name: 'Альберт Эйнштейн', birthOrFounded: '1879-03-14', prizesCount: 1 },
  { id: '217', name: 'Лайнус Полинг', birthOrFounded: '1901-02-28', prizesCount: 2 },
  { id: '66', name: 'Джон Бардин', birthOrFounded: '1908-05-23', prizesCount: 2 },
  { id: '222', name: 'Фредерик Сенгер', birthOrFounded: '1918-08-13', prizesCount: 2 },
  { id: '482', name: 'Международный комитет Красного Креста', birthOrFounded: '1863-00-00', prizesCount: 3 },
  { id: '515', name: 'Управление Верховного комиссара ООН по делам беженцев', birthOrFounded: '1950-00-00', prizesCount: 2 },
  { id: '914', name: 'Малала Юсуфзай', birthOrFounded: '1997-07-12', prizesCount: 1 },
]
