const items = [
  { id: 'dashboard', label: 'Orders & Dashboard' },
  { id: 'content', label: 'Storefront Content' }
]

export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-rose-100 z-50 flex-col p-6">
      <div className="mb-8">
        <h2 className="font-heading text-3xl text-slate-900">Cakely Admin</h2>
        <p className="text-sm text-slate-500 mt-2">Storefront management</p>
      </div>

      <nav className="space-y-2 overflow-y-auto pr-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block rounded-2xl px-4 py-3 text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}


// const items = [
//   { id: 'overview', label: 'Overview' },
//   { id: 'orders', label: 'Orders' },
//   { id: 'products', label: 'Products' },
//   { id: 'offers', label: 'Offers' },
//   { id: 'reviews', label: 'Reviews' },
//   { id: 'faqs', label: 'FAQs' },
//   { id: 'hero', label: 'Hero' },
//   { id: 'contact', label: 'Contact' },
//   { id: 'settings', label: 'Settings' }
// ]

// export default function AdminSidebar() {
//   return (
//     <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-rose-100 z-50 flex-col p-6">
//       <div className="mb-8">
//         <h2 className="font-heading text-3xl text-slate-900">Cakely Admin</h2>
//         <p className="text-sm text-slate-500 mt-2">Storefront management</p>
//       </div>

//       <nav className="space-y-2 overflow-y-auto pr-1">
//         {items.map((item) => (
//           <a
//             key={item.id}
//             href={`#${item.id}`}
//             className="block rounded-2xl px-4 py-3 text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition"
//           >
//             {item.label}
//           </a>
//         ))}
//       </nav>
//     </aside>
//   )
// }