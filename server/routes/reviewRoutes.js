import { Router } from 'express'
import {
  createReview,
  deleteReview,
  getReviewById,
  getReviews,
  updateReview,
} from '../controllers/reviewController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { mongoIdParam, reviewValidators } from '../validators/commonValidators.js'

const router = Router()

router.route('/').get(getReviews).post(protect, reviewValidators, validateRequest, createReview)
router
  .route('/:id')
  .get(mongoIdParam, validateRequest, getReviewById)
  .put(protect, mongoIdParam, reviewValidators, validateRequest, updateReview)
  .delete(protect, adminOnly, mongoIdParam, validateRequest, deleteReview)

export default router
