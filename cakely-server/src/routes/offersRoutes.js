import express from 'express'
import {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer
} from '../controllers/offersController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getOffers)
router.post('/', protect, createOffer)
router.put('/:id', protect, updateOffer)
router.delete('/:id', protect, deleteOffer)

export default router