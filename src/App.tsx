import { useState } from 'react'
import { channels, revenue, stats } from './data'
import StatCard from './components/StatCard'
import LineChart from './components/LineChart'
import BarList from './components/BarList'
import OrdersTable from './components/OrdersTable'

const NAV = ['Genel bakış', 'Siparişler', 'Müşteriler', 'Ürünler', 'Ayarlar']

export default function App() {
  const [page, setPage] = useState(NAV[0])
  const [dark, setDark] = useState(false)

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">D</span>
          Dashboard
        </div>
        <nav className="nav">
          {NAV.map((item) => (
            <button key={item} onClick={() => setPage(item)} aria-current={page === item ? 'page' : undefined}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <h1>{page}</h1>
            <p>Son 12 ayın özeti · 3 Ağustos 2026</p>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {dark ? 'Açık tema' : 'Koyu tema'}
          </button>
        </div>

        <section className="stat-grid">
          {stats.map((s) => (
            <StatCard key={s.id} stat={s} />
          ))}
        </section>

        <section className="chart-grid">
          <div className="card">
            <div className="card-head">
              <h2>Aylık gelir</h2>
              <p>Bin ₺ · son 12 ay</p>
            </div>
            <LineChart data={revenue} />
          </div>

          <div className="card">
            <div className="card-head">
              <h2>Kanallara göre sipariş</h2>
              <p>Adet · son 30 gün</p>
            </div>
            <BarList data={channels} />
          </div>
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Son siparişler</h2>
          </div>
          <OrdersTable />
        </section>
      </main>
    </div>
  )
}
