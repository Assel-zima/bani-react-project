import Service from '../models/Service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 })
  res.json(services)
})

export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (!service) {
    res.status(404)
    throw new Error('Service not found')
  }

  res.json(service)
})

export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body)
  res.status(201).json(service)
})

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!service) {
    res.status(404)
    throw new Error('Service not found')
  }

  res.json(service)
})

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id)

  if (!service) {
    res.status(404)
    throw new Error('Service not found')
  }

  res.json({ message: 'Service deleted' })
})
