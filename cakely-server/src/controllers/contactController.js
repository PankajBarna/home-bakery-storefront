import { readJsonFile, writeJsonFile } from '../utils/fileDb.js'

const FILE_NAME = 'contact.json'

export async function getContact(req, res, next) {
  try {
    const contact = await readJsonFile(FILE_NAME, {})
    res.json(contact)
  } catch (error) {
    next(error)
  }
}

export async function updateContact(req, res, next) {
  try {
    const current = await readJsonFile(FILE_NAME, {})
    const updated = { ...current, ...req.body }
    await writeJsonFile(FILE_NAME, updated)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}