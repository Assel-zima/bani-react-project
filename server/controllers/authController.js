import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { createToken } from '../utils/token.js'

function authResponse(user) {
  return {
    user,
    token: createToken(user),
  }
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    res.status(409)
    throw new Error('Этот email уже зарегистрирован')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, phone, password: hashedPassword })

  res.status(201).json(authResponse(user))
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    res.status(401)
    throw new Error('Неверный email или пароль')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    res.status(401)
    throw new Error('Неверный email или пароль')
  }

  res.json(authResponse(user))
})

export const getMe = asyncHandler(async (req, res) => {
  res.json(req.user)
})
