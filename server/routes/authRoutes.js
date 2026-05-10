import { Router } from 'express'
import { getMe, login, register } from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { authLoginValidators, authRegisterValidators } from '../validators/commonValidators.js'

const router = Router()

router.post('/register', authRegisterValidators, validateRequest, register)
router.post('/login', authLoginValidators, validateRequest, login)
router.get('/me', protect, getMe)

export default router
