import { readJsonFile, writeJsonFile } from '../utils/fileDb.js'
import { createId } from '../utils/id.js'

const FILE_NAME = 'offers.json'

export async function getOffers(req, res, next) {
  try {
    const offers = await readJsonFile(FILE_NAME, [])
    res.json(offers)
  } catch (error) {
    next(error)
  }
}

export async function createOffer(req, res, next) {
  try {
    const { title, badge, description } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Offer title is required' })
    }

    const offers = await readJsonFile(FILE_NAME, [])

    const newOffer = {
      id: createId('offer'),
      title,
      badge: badge || '',
      description: description || ''
    }

    const updated = [newOffer, ...offers]
    await writeJsonFile(FILE_NAME, updated)

    res.status(201).json(newOffer)
  } catch (error) {
    next(error)
  }
}

export async function updateOffer(req, res, next) {
  try {
    const { id } = req.params
    const offers = await readJsonFile(FILE_NAME, [])
    const index = offers.findIndex((item) => item.id === id)

    if (index === -1) {
      return res.status(404).json({ message: 'Offer not found' })
    }

    offers[index] = { ...offers[index], ...req.body }
    await writeJsonFile(FILE_NAME, offers)

    res.json(offers[index])
  } catch (error) {
    next(error)
  }
}

export async function deleteOffer(req, res, next) {
  try {
    const { id } = req.params
    const offers = await readJsonFile(FILE_NAME, [])
    const filtered = offers.filter((item) => item.id !== id)

    if (filtered.length === offers.length) {
      return res.status(404).json({ message: 'Offer not found' })
    }

    await writeJsonFile(FILE_NAME, filtered)
    res.json({ message: 'Offer deleted' })
  } catch (error) {
    next(error)
  }
}