export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="input h-14 text-base"
      placeholder="Search cakes by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}