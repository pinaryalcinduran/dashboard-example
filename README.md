# dashboard-example

Vite + React 19 + TypeScript ile basit bir dashboard örneği. Harici UI/chart kütüphanesi yok — grafikler elle yazılmış SVG/CSS.

## Çalıştırma

```bash
npm install
npm run dev
```

## İçerik

- `src/App.tsx` — sayfa iskeleti (sidebar + üst bar + grid)
- `src/data.ts` — tüm örnek veri tek dosyada
- `src/components/StatCard.tsx` — KPI kartı (değer + değişim)
- `src/components/LineChart.tsx` — SVG alan/çizgi grafiği, hover'da crosshair + tooltip
- `src/components/BarList.tsx` — yatay bar listesi
- `src/components/OrdersTable.tsx` — son siparişler tablosu
- `src/styles.css` — CSS değişkenleri, açık/koyu tema

Tema hem işletim sistemi ayarını (`prefers-color-scheme`) hem de sağ üstteki düğmeyi (`data-theme`) dinler.
# dashboard-example
