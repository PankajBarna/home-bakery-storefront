import { env } from '../config/env.js'
import { createToken } from '../utils/token.js'

export function loginAdmin(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  const token = createToken({
    username,
    role: 'admin'
  })

  res.json({
    message: 'Login successful',
    token
  })
}