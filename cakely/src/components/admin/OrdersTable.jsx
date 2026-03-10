import { useMemo, useState } from 'react'
import Select from '../ui/Select'
import StatusBadge from './StatusBadge'

function formatDateTime(value) {
  if (!value) return '—'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit'
  })
}

function isOverdue(order) {
  if (!order?.date) return false
  if (order.status === 'completed' || order.status === 'cancelled') return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const orderDate = new Date(order.date)
  orderDate.setHours(0, 0, 0, 0)

  return orderDate < today
}

export default function OrdersTable({ orders, onStatusChange }) {
  const [filter, setFilter] = useState('all')

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const aTime = new Date(a.createdAt || 0).getTime()
      const bTime = new Date(b.createdAt || 0).getTime()
      return bTime - aTime
    })
  }, [orders])

  const filteredOrders = useMemo(() => {
    if (filter === 'all') return sortedOrders
    if (filter === 'overdue') return sortedOrders.filter(isOverdue)
    return sortedOrders.filter((order) => order.status === filter)
  }, [sortedOrders, filter])

  const filterButtonClass = (value) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      filter === value
        ? 'bg-brand-600 text-white'
        : 'bg-white border border-rose-200 text-slate-700 hover:bg-rose-50'
    }`

  return (
    <section className="card p-5 md:p-6">
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h3 className="font-heading text-3xl text-slate-900">Orders</h3>
          <p className="text-sm text-slate-500 mt-2">
            {filteredOrders.length} of {sortedOrders.length} order(s)
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button type="button" onClick={() => setFilter('all')} className={filterButtonClass('all')}>
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={filterButtonClass('pending')}
          >
            Pending
          </button>
          <button
            type="button"
            onClick={() => setFilter('preparing')}
            className={filterButtonClass('preparing')}
          >
            Preparing
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={filterButtonClass('completed')}
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() => setFilter('overdue')}
            className={filterButtonClass('overdue')}
          >
            Overdue
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[1080px]">
          <thead>
            <tr className="text-left border-b border-rose-100">
              <th className="py-3 pr-4 text-slate-500 font-medium">Customer</th>
              <th className="py-3 pr-4 text-slate-500 font-medium">Phone</th>
              <th className="py-3 pr-4 text-slate-500 font-medium">Mode</th>
              <th className="py-3 pr-4 text-slate-500 font-medium">Date</th>
              <th className="py-3 pr-4 text-slate-500 font-medium">Items</th>
              <th className="py-3 pr-4 text-slate-500 font-medium">Amount</th>
              <th className="py-3 pr-4 text-slate-500 font-medium">Status</th>
              <th className="py-3 pr-4 text-slate-500 font-medium">Received</th>
              <th className="py-3 text-slate-500 font-medium">Update</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => {
              const overdue = isOverdue(order)

              return (
                <tr
                  key={order.id}
                  className={`border-b border-rose-50 align-top ${
                    overdue ? 'bg-red-50/60' : ''
                  }`}
                >
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-slate-900">{order.name}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <p className="text-slate-500 text-xs">{order.address || 'No address'}</p>
                      {overdue && (
                        <span className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold bg-red-100 text-red-700">
                          Overdue
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 pr-4 text-slate-700">{order.phone}</td>
                  <td className="py-4 pr-4 text-slate-700 capitalize">
                    {order.fulfillmentType}
                  </td>
                  <td className="py-4 pr-4 text-slate-700">{order.date}</td>

                  <td className="py-4 pr-4">
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-slate-700">
                          {item.name} × {item.quantity}
                        </p>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 pr-4 font-semibold text-brand-700">
                    {order.total}
                  </td>

                  <td className="py-4 pr-4">
                    <StatusBadge value={order.status} />
                  </td>

                  <td className="py-4 pr-4">
                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-700">
                      {formatDateTime(order.createdAt)}
                    </span>
                  </td>

                  <td className="py-4">
                    <Select
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="out_for_delivery">Out for delivery</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}