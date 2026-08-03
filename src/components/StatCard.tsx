import type { Stat } from '../data'

export default function StatCard({ stat }: { stat: Stat }) {
  const isGood = stat.delta > 0 === stat.upIsGood
  const sign = stat.delta > 0 ? '+' : '−'
  const magnitude = Math.abs(stat.delta).toLocaleString('tr-TR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  return (
    <div className="card">
      <div className="stat-label">{stat.label}</div>
      <div className="stat-value">{stat.value}</div>
      <div className={`stat-delta ${isGood ? 'is-good' : 'is-bad'}`}>
        <strong>
          {sign}%{magnitude}
        </strong>
        <span>{stat.deltaLabel}</span>
      </div>
    </div>
  )
}
