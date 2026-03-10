import express from 'express'
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getReviews)
router.post('/', protect, createReview)
router.put('/:id', protect, updateReview)
router.delete('/:id', protect, deleteReview)

export default router