import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import authRoutes from './routes/authRoutes.js'
import ordersRoutes from './routes/ordersRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import offersRoutes from './routes/offersRoutes.js'
import reviewsRoutes from './routes/reviewsRoutes.js'
import faqRoutes from './routes/faqRoutes.js'
import heroRoutes from './routes/heroRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorMiddleware.js'

const app = express()

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true
  })
)

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ message: 'Cakely API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/offers', offersRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/faq', faqRoutes)
app.use('/api/hero', heroRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/settings', settingsRoutes)

app.use(notFound)
app.use(errorHandler)

export default app