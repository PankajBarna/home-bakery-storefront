import { readJsonFile, writeJsonFile } from '../utils/fileDb.js'

const FILE_NAME = 'hero.json'

export async function getHero(req, res, next) {
  try {
    const hero = await readJsonFile(FILE_NAME, {})
    res.json(hero)
  } catch (error) {
    next(error)
  }
}

export async function updateHero(req, res, next) {
  try {
    const current = await readJsonFile(FILE_NAME, {})
    const updated = { ...current, ...req.body }
    await writeJsonFile(FILE_NAME, updated)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}