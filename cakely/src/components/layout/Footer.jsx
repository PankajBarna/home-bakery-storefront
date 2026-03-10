export default function Footer() {
  return (
    <footer className="py-10 border-t border-rose-100 bg-white">
      <div className="section-wrap flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-heading text-2xl">Cakely</p>
          <p className="text-slate-500">Homemade cakes for sweet celebrations.</p>
        </div>
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Cakely. Made with love in Palava Phase 2.</p>
      </div>
    </footer>
  )
}