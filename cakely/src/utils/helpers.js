export const getUniqueCategories = (products = []) => {
  const categories = [...new Set(products.map((item) => item.category))]
  return ['All', ...categories]
}

export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}