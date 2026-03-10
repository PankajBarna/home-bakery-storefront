import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-rose-50">
      <AdminSidebar />

      <div className="md:ml-64 min-h-screen">
        <AdminTopbar />
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}