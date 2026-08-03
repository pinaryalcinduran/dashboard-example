import { orders, statusLabels } from '../data'

export default function OrdersTable() {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Sipariş</th>
            <th>Müşteri</th>
            <th>Tarih</th>
            <th>Tutar</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="num">{o.id}</td>
              <td>{o.customer}</td>
              <td className="num">{o.date}</td>
              <td className="num">{o.total}</td>
              <td>
                <span className={`badge ${o.status}`}>
                  <span className="dot" />
                  {statusLabels[o.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
