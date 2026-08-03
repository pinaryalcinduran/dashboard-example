import { useState } from 'react'
import type { Point } from '../data'

const W = 720
const H = 260
const PAD = { top: 18, right: 22, bottom: 26, left: 46 }

/** Ekseni 0/60/120/180 gibi okunur sayılara yuvarlar. */
function niceMax(max: number, divisions = 3) {
  const rough = max / divisions
  const magnitude = 10 ** Math.floor(Math.log10(rough))
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map((m) => m * magnitude).find((s) => s >= rough)!
  return step * divisions
}

type Hover = { i: number; left: number; top: number }

export default function LineChart({ data, unit = '' }: { data: Point[]; unit?: string }) {
  const [hover, setHover] = useState<Hover | null>(null)

  const top = niceMax(Math.max(...data.map((d) => d.value)))
  const plotW = W - PAD.left - PAD.right
  const plotH = H - PAD.top - PAD.bottom
  const dx = plotW / (data.length - 1)

  const x = (i: number) => PAD.left + i * dx
  const y = (v: number) => PAD.top + plotH - (v / top) * plotH

  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.value)}`).join(' ')
  const area = `${line} L ${x(data.length - 1)} ${PAD.top + plotH} L ${x(0)} ${PAD.top + plotH} Z`

  const ticks = [0, 1, 2, 3].map((n) => (top / 3) * n)
  const last = data.length - 1

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const scale = rect.width / W
    const svgX = (e.clientX - rect.left) / scale
    const i = Math.min(last, Math.max(0, Math.round((svgX - PAD.left) / dx)))
    setHover({
      i,
      left: Math.min(rect.width - 62, Math.max(62, x(i) * scale)),
      top: y(data[i].value) * scale - 12,
    })
  }

  return (
    <div className="chart" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Aylara göre gelir">
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(t)}
              y2={y(t)}
              stroke={t === 0 ? 'var(--baseline)' : 'var(--grid)'}
              strokeWidth={1}
            />
            <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" fontSize={11} fill="var(--text-muted)">
              {t.toLocaleString('tr-TR')}
            </text>
          </g>
        ))}

        <path d={area} fill="var(--series-1)" fillOpacity={0.1} />
        <path d={line} fill="none" stroke="var(--series-1)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {data.map((d, i) => (
          <text key={d.label} x={x(i)} y={H - 6} textAnchor="middle" fontSize={11} fill="var(--text-muted)">
            {d.label}
          </text>
        ))}

        {/* son nokta: doğrudan etiket + yüzey halkası */}
        <circle cx={x(last)} cy={y(data[last].value)} r={5} fill="var(--series-1)" stroke="var(--surface)" strokeWidth={2} />
        <text
          x={x(last)}
          y={y(data[last].value) - 14}
          textAnchor="end"
          fontSize={12}
          fontWeight={600}
          fill="var(--text-primary)"
        >
          {data[last].value.toLocaleString('tr-TR')}
          {unit}
        </text>

        {hover && (
          <g>
            <line
              x1={x(hover.i)}
              x2={x(hover.i)}
              y1={PAD.top}
              y2={PAD.top + plotH}
              stroke="var(--baseline)"
              strokeWidth={1}
            />
            <circle
              cx={x(hover.i)}
              cy={y(data[hover.i].value)}
              r={5}
              fill="var(--series-1)"
              stroke="var(--surface)"
              strokeWidth={2}
            />
          </g>
        )}
      </svg>

      {hover && (
        <div className="tooltip" style={{ left: hover.left, top: hover.top }}>
          <div className="tooltip-label">{data[hover.i].label}</div>
          <div className="tooltip-value">
            <span className="swatch" />
            {data[hover.i].value.toLocaleString('tr-TR')}
            {unit}
          </div>
        </div>
      )}
    </div>
  )
}
