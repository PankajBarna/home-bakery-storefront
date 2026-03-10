export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium border transition shrink-0 ${
            active === category
              ? 'bg-brand-600 text-white border-brand-600'
              : 'bg-white text-slate-700 border-rose-200 hover:bg-rose-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}