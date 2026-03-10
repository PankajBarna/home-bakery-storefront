import { readJsonFile, writeJsonFile } from '../utils/fileDb.js'
import { createId } from '../utils/id.js'

const FILE_NAME = 'reviews.json'

export async function getReviews(req, res, next) {
  try {
    const reviews = await readJsonFile(FILE_NAME, [])
    res.json(reviews)
  } catch (error) {
    next(error)
  }
}

export async function createReview(req, res, next) {
  try {
    const { name, subtitle, location, rating, text } = req.body

    if (!name || !text) {
      return res.status(400).json({ message: 'Name and review text are required' })
    }

    const reviews = await readJsonFile(FILE_NAME, [])

    const newReview = {
      id: createId('review'),
      name,
      subtitle: subtitle || '',
      location: location || '',
      rating: rating || '5',
      text
    }

    const updated = [newReview, ...reviews]
    await writeJsonFile(FILE_NAME, updated)

    res.status(201).json(newReview)
  } catch (error) {
    next(error)
  }
}

export async function updateReview(req, res, next) {
  try {
    const { id } = req.params
    const reviews = await readJsonFile(FILE_NAME, [])
    const index = reviews.findIndex((item) => item.id === id)

    if (index === -1) {
      return res.status(404).json({ message: 'Review not found' })
    }

    reviews[index] = { ...reviews[index], ...req.body }
    await writeJsonFile(FILE_NAME, reviews)

    res.json(reviews[index])
  } catch (error) {
    next(error)
  }
}

export async function deleteReview(req, res, next) {
  try {
    const { id } = req.params
    const reviews = await readJsonFile(FILE_NAME, [])
    const filtered = reviews.filter((item) => item.id !== id)

    if (filtered.length === reviews.length) {
      return res.status(404).json({ message: 'Review not found' })
    }

    await writeJsonFile(FILE_NAME, filtered)
    res.json({ message: 'Review deleted' })
  } catch (error) {
    next(error)
  }
}