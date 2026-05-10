import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { mongoIdParam, userUpdateValidators, userValidators } from '../validators/commonValidators.js'

const router = Router()

router.use(protect, adminOnly)

router.route('/').get(getUsers).post(userValidators, validateRequest, createUser)
router
  .route('/:id')
  .get(mongoIdParam, validateRequest, getUserById)
  .put(mongoIdParam, userUpdateValidators, validateRequest, updateUser)
  .delete(mongoIdParam, validateRequest, deleteUser)

export default router
