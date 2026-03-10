import StatusBadge from './StatusBadge'

export default function EntityTable({ title, items, columns, onDelete, onEdit }) {
  const renderCell = (item, col) => {
    const value = item[col.key]

    if (col.key === 'available') {
      return (
        <StatusBadge
          value={value ? 'live' : 'sold_out'}
          label={value ? 'Live' : 'Sold Out'}
        />
      )
    }

    if (col.key === 'bestseller') {
      return (
        <StatusBadge
          value={value ? 'yes' : 'no'}
          label={value ? 'Yes' : 'No'}
        />
      )
    }

    return String(value ?? '')
  }

  return (
    <section className="card p-5 md:p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="font-heading text-3xl text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{items.length} item(s)</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="text-left border-b border-rose-100">
              {columns.map((col) => (
                <th key={col.key} className="py-3 pr-4 text-slate-500 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="py-3 text-slate-500 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-rose-50">
                {columns.map((col) => (
                  <td key={col.key} className="py-4 pr-4 text-slate-700 align-top">
                    {renderCell(item, col)}
                  </td>
                ))}

                <td className="py-4">
                  <div className="flex items-center gap-4">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="text-brand-600 hover:text-brand-700 font-medium"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}