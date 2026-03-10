import express from 'express'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)
router.post('/', protect, createProduct)
router.put('/:id', protect, updateProduct)
router.delete('/:id', protect, deleteProduct)

export default router