import { Router } from 'express'
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from '../controllers/projectController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { mongoIdParam, projectValidators } from '../validators/commonValidators.js'

const router = Router()

router.route('/').get(getProjects).post(protect, adminOnly, projectValidators, validateRequest, createProject)
router
  .route('/:id')
  .get(mongoIdParam, validateRequest, getProjectById)
  .put(protect, adminOnly, mongoIdParam, projectValidators, validateRequest, updateProject)
  .delete(protect, adminOnly, mongoIdParam, validateRequest, deleteProject)

export default router
