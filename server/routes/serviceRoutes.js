import { Router } from 'express'
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from '../controllers/serviceController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { mongoIdParam, serviceValidators } from '../validators/commonValidators.js'

const router = Router()

router.route('/').get(getServices).post(protect, adminOnly, serviceValidators, validateRequest, createService)
router
  .route('/:id')
  .get(mongoIdParam, validateRequest, getServiceById)
  .put(protect, adminOnly, mongoIdParam, serviceValidators, validateRequest, updateService)
  .delete(protect, adminOnly, mongoIdParam, validateRequest, deleteService)

export default router
