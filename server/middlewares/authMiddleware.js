import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401)
    throw new Error('Authorization token is required')
  }

  const token = header.split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
  const user = await User.findById(decoded.id)

  if (!user) {
    res.status(401)
    throw new Error('User from token was not found')
  }

  req.user = user
  next()
})

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    res.status(403)
    next(new Error('Admin role is required'))
    return
  }

  next()
}
