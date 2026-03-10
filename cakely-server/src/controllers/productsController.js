import { readJsonFile, writeJsonFile } from '../utils/fileDb.js'
import { createId } from '../utils/id.js'

const FILE_NAME = 'products.json'

function parseList(value, fallback = []) {
  if (Array.isArray(value)) return value
  if (!value || typeof value !== 'string') return fallback
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseWeightPrices(value, fallbackBasePrice = '0') {
  if (Array.isArray(value)) return value

  if (!value || typeof value !== 'string') {
    return [{ weight: '1/2 kg', price: fallbackBasePrice }]
  }

  const parsed = value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [weight, price] = entry.split(':').map((item) => item.trim())
      return {
        weight: weight || '1/2 kg',
        price: price || fallbackBasePrice
      }
    })

  return parsed.length ? parsed : [{ weight: '1/2 kg', price: fallbackBasePrice }]
}

function normalizeProduct(body) {
  const basePrice = String(body.basePrice || '0').trim()
  const weightPrices = parseWeightPrices(body.weightPrices, basePrice)
  const weights =
    Array.isArray(body.weights) && body.weights.length
      ? body.weights
      : weightPrices.map((item) => item.weight)

  return {
    name: String(body.name || '').trim(),
    category: String(body.category || '').trim(),
    basePrice,
    image: String(body.image || '').trim(),
    description: String(body.description || '').trim(),
    weights,
    weightPrices,
    flavours: parseList(body.flavours, ['Chocolate', 'Vanilla']),
    eggTypes: parseList(body.eggTypes, ['Eggless']),
    available:
      typeof body.available === 'boolean'
        ? body.available
        : String(body.available).toLowerCase() !== 'false',
    bestseller:
      typeof body.bestseller === 'boolean'
        ? body.bestseller
        : String(body.bestseller).toLowerCase() === 'true'
  }
}

// function normalizeProduct(body) {
//   const basePrice = String(body.basePrice || '0').trim()

//   return {
//     name: String(body.name || '').trim(),
//     category: String(body.category || '').trim(),
//     basePrice,
//     image: String(body.image || '').trim(),
//     description: String(body.description || '').trim(),
//     weights: parseList(body.weights, ['1/2 kg', '1 kg']),
//     weightPrices: parseWeightPrices(body.weightPrices, basePrice),
//     flavours: parseList(body.flavours, ['Chocolate', 'Vanilla']),
//     eggTypes: parseList(body.eggTypes, ['Eggless']),
//     available:
//       typeof body.available === 'boolean'
//         ? body.available
//         : String(body.available).toLowerCase() !== 'false',
//     bestseller:
//       typeof body.bestseller === 'boolean'
//         ? body.bestseller
//         : String(body.bestseller).toLowerCase() === 'true'
//   }
// }

export async function getProducts(req, res, next) {
  try {
    const products = await readJsonFile(FILE_NAME, [])
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export async function createProduct(req, res, next) {
  try {
    const normalized = normalizeProduct(req.body)

    if (!normalized.name || !normalized.category || !normalized.basePrice) {
      return res.status(400).json({
        message: 'Name, category, and base price are required'
      })
    }

    const products = await readJsonFile(FILE_NAME, [])

    const newProduct = {
      id: createId('product'),
      ...normalized
    }

    const updated = [newProduct, ...products]
    await writeJsonFile(FILE_NAME, updated)

    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params
    const products = await readJsonFile(FILE_NAME, [])
    const index = products.findIndex((item) => item.id === id)

    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const merged = {
      ...products[index],
      ...normalizeProduct({
        ...products[index],
        ...req.body
      })
    }

    products[index] = merged
    await writeJsonFile(FILE_NAME, products)

    res.json(products[index])
  } catch (error) {
    next(error)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params
    const products = await readJsonFile(FILE_NAME, [])
    const filtered = products.filter((item) => item.id !== id)

    if (filtered.length === products.length) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await writeJsonFile(FILE_NAME, filtered)
    res.json({ message: 'Product deleted' })
  } catch (error) {
    next(error)
  }
}