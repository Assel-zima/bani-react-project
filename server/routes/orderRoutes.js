import { Router } from 'express'
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from '../controllers/orderController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { mongoIdParam, orderValidators } from '../validators/commonValidators.js'

const router = Router()

router.use(protect)

router.route('/').get(adminOnly, getOrders).post(orderValidators, validateRequest, createOrder)
router
  .route('/:id')
  .get(mongoIdParam, validateRequest, getOrderById)
  .put(adminOnly, mongoIdParam, orderValidators, validateRequest, updateOrder)
  .delete(adminOnly, mongoIdParam, validateRequest, deleteOrder)

export default router
