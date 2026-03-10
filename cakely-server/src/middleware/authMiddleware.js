import { verifyToken } from '../utils/token.js'

export function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || ''

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    req.admin = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}