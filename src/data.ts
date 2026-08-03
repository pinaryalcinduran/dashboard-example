export type Stat = {
  id: string
  label: string
  value: string
  delta: number
  deltaLabel: string
  /** true ise artış iyi, false ise artış kötü */
  upIsGood: boolean
}

export const stats: Stat[] = [
  { id: 'revenue', label: 'Toplam gelir', value: '₺1,28M', delta: 12.4, deltaLabel: 'geçen aya göre', upIsGood: true },
  { id: 'orders', label: 'Sipariş', value: '3.842', delta: 5.1, deltaLabel: 'geçen aya göre', upIsGood: true },
  { id: 'users', label: 'Aktif kullanıcı', value: '18.204', delta: -2.3, deltaLabel: 'geçen aya göre', upIsGood: true },
  { id: 'refund', label: 'İade oranı', value: '%2,1', delta: -0.6, deltaLabel: 'geçen aya göre', upIsGood: false },
]

export type Point = { label: string; value: number }

/** Aylık gelir (bin ₺) */
export const revenue: Point[] = [
  { label: 'Oca', value: 74 },
  { label: 'Şub', value: 82 },
  { label: 'Mar', value: 79 },
  { label: 'Nis', value: 95 },
  { label: 'May', value: 108 },
  { label: 'Haz', value: 101 },
  { label: 'Tem', value: 124 },
  { label: 'Ağu', value: 139 },
  { label: 'Eyl', value: 132 },
  { label: 'Eki', value: 151 },
  { label: 'Kas', value: 148 },
  { label: 'Ara', value: 167 },
]

/** Kanal kırılımı (sipariş adedi) */
export const channels: Point[] = [
  { label: 'Organik', value: 1420 },
  { label: 'Reklam', value: 980 },
  { label: 'E-posta', value: 640 },
  { label: 'Sosyal', value: 512 },
  { label: 'Diğer', value: 290 },
]

export type OrderStatus = 'completed' | 'pending' | 'cancelled'

export type Order = {
  id: string
  customer: string
  date: string
  total: string
  status: OrderStatus
}

export const orders: Order[] = [
  { id: '#10482', customer: 'Ayşe Yılmaz', date: '02.08.2026', total: '₺2.450', status: 'completed' },
  { id: '#10481', customer: 'Mehmet Demir', date: '02.08.2026', total: '₺890', status: 'pending' },
  { id: '#10480', customer: 'Zeynep Kaya', date: '01.08.2026', total: '₺5.120', status: 'completed' },
  { id: '#10479', customer: 'Emre Şahin', date: '01.08.2026', total: '₺340', status: 'cancelled' },
  { id: '#10478', customer: 'Elif Aydın', date: '31.07.2026', total: '₺1.775', status: 'completed' },
  { id: '#10477', customer: 'Burak Çelik', date: '31.07.2026', total: '₺620', status: 'pending' },
]

export const statusLabels: Record<OrderStatus, string> = {
  completed: 'Tamamlandı',
  pending: 'Bekliyor',
  cancelled: 'İptal',
}
