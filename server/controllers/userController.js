import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 })
  res.json(users)
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json(user)
})

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    res.status(409)
    throw new Error('Email is already registered')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, phone, role, password: hashedPassword })

  res.status(201).json(user)
})

export const updateUser = asyncHandler(async (req, res) => {
  const payload = { ...req.body }

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10)
  }

  const user = await User.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json(user)
})

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json({ message: 'User deleted' })
})
