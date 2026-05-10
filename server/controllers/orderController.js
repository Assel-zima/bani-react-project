import Order from '../models/Order.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const orderPopulate = ['customer', 'services', 'project']

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate(orderPopulate).sort({ createdAt: -1 })
  res.json(orders)
})

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(orderPopulate)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  res.json(order)
})

export const createOrder = asyncHandler(async (req, res) => {
  const payload = { ...req.body, customer: req.body.customer || req.user._id }
  const order = await Order.create(payload)
  const populatedOrder = await order.populate(orderPopulate)
  res.status(201).json(populatedOrder)
})

export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate(orderPopulate)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  res.json(order)
})

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  res.json({ message: 'Order deleted' })
})
