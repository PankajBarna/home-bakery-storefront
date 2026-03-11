import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

export default function AdminLayout({ children, activeTab, setActiveTab }) {
  return (
    <div className="min-h-screen bg-rose-50/40">
      <AdminTopbar />

      <div className="grid min-h-[calc(100vh-80px)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="hidden lg:block" />

        <aside className="lg:fixed lg:left-0 lg:top-[80px] lg:h-[calc(100vh-80px)] lg:w-[280px] lg:overflow-y-auto lg:border-r lg:border-rose-100 lg:bg-white">
          <div className="p-6">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </aside>

        <main className="min-w-0 px-4 py-6 sm:px-6 lg:col-start-2 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}



// import AdminSidebar from './AdminSidebar'
// import AdminTopbar from './AdminTopbar'

// export default function AdminLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-rose-50">
//       <AdminSidebar />

//       <div className="md:ml-64 min-h-screen">
//         <AdminTopbar />
//         <main className="p-4 md:p-8">{children}</main>
//       </div>
//     </div>
//   )
// }

