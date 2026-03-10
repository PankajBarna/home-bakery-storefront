import { readJsonFile, writeJsonFile } from '../utils/fileDb.js'
import { createId } from '../utils/id.js'

const FILE_NAME = 'faq.json'

export async function getFaqs(req, res, next) {
  try {
    const faqs = await readJsonFile(FILE_NAME, [])
    res.json(faqs)
  } catch (error) {
    next(error)
  }
}

export async function createFaq(req, res, next) {
  try {
    const { question, answer } = req.body

    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' })
    }

    const faqs = await readJsonFile(FILE_NAME, [])

    const newFaq = {
      id: createId('faq'),
      question,
      answer
    }

    const updated = [newFaq, ...faqs]
    await writeJsonFile(FILE_NAME, updated)

    res.status(201).json(newFaq)
  } catch (error) {
    next(error)
  }
}

export async function updateFaq(req, res, next) {
  try {
    const { id } = req.params
    const faqs = await readJsonFile(FILE_NAME, [])
    const index = faqs.findIndex((item) => item.id === id)

    if (index === -1) {
      return res.status(404).json({ message: 'FAQ not found' })
    }

    faqs[index] = { ...faqs[index], ...req.body }
    await writeJsonFile(FILE_NAME, faqs)

    res.json(faqs[index])
  } catch (error) {
    next(error)
  }
}

export async function deleteFaq(req, res, next) {
  try {
    const { id } = req.params
    const faqs = await readJsonFile(FILE_NAME, [])
    const filtered = faqs.filter((item) => item.id !== id)

    if (filtered.length === faqs.length) {
      return res.status(404).json({ message: 'FAQ not found' })
    }

    await writeJsonFile(FILE_NAME, filtered)
    res.json({ message: 'FAQ deleted' })
  } catch (error) {
    next(error)
  }
}