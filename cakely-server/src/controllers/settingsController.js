import { readJsonFile, writeJsonFile } from '../utils/fileDb.js'

const FILE_NAME = 'settings.json'

export async function getSettings(req, res, next) {
  try {
    const settings = await readJsonFile(FILE_NAME, {})
    res.json(settings)
  } catch (error) {
    next(error)
  }
}

export async function updateSettings(req, res, next) {
  try {
    const current = await readJsonFile(FILE_NAME, {})
    const updated = { ...current, ...req.body }
    await writeJsonFile(FILE_NAME, updated)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}