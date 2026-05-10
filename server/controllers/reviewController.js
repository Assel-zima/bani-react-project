import Review from '../models/Review.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const reviewPopulate = ['author', 'project']

export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate(reviewPopulate).sort({ createdAt: -1 })
  res.json(reviews)
})

export const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id).populate(reviewPopulate)

  if (!review) {
    res.status(404)
    throw new Error('Review not found')
  }

  res.json(review)
})

export const createReview = asyncHandler(async (req, res) => {
  const payload = { ...req.body, author: req.body.author || req.user._id }
  const review = await Review.create(payload)
  const populatedReview = await review.populate(reviewPopulate)
  res.status(201).json(populatedReview)
})

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate(reviewPopulate)

  if (!review) {
    res.status(404)
    throw new Error('Review not found')
  }

  res.json(review)
})

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id)

  if (!review) {
    res.status(404)
    throw new Error('Review not found')
  }

  res.json({ message: 'Review deleted' })
})
