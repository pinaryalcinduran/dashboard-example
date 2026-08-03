import type { Point } from '../data'

export default function BarList({ data }: { data: Point[] }) {
  const max = Math.max(...data.map((d) => d.value))
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="bars">
      {data.map((d) => (
        <div key={d.label} className="bar-row" title={`%${Math.round((d.value / total) * 100)} pay`}>
          <span className="bar-name">{d.label}</span>
          <span className="bar-track">
            <span className="bar-fill" style={{ width: `${(d.value / max) * 100}%` }} />
          </span>
          <span className="bar-value">{d.value.toLocaleString('tr-TR')}</span>
        </div>
      ))}
    </div>
  )
}
