import { body, param } from 'express-validator'

export const mongoIdParam = [param('id').isMongoId().withMessage('Invalid MongoDB id')]

export const authRegisterValidators = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 chars'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  body('phone').optional().trim().isLength({ max: 30 }).withMessage('Phone is too long'),
]

export const authLoginValidators = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

export const userValidators = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 chars'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin'),
]

export const userUpdateValidators = [
  body('name').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 chars'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin'),
]

export const serviceValidators = [
  body('title').trim().isLength({ min: 3, max: 120 }).withMessage('Title must be 3-120 chars'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description is too short'),
  body('priceFrom').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('durationDays').isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
]

export const projectValidators = [
  body('title').trim().isLength({ min: 3, max: 120 }).withMessage('Title must be 3-120 chars'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('area').isFloat({ min: 1 }).withMessage('Area must be greater than 0'),
  body('budget').isFloat({ min: 0 }).withMessage('Budget must be positive'),
  body('services').optional().isArray().withMessage('Services must be an array'),
  body('services.*').optional().isMongoId().withMessage('Each service id must be valid'),
]

export const orderValidators = [
  body('services').isArray({ min: 1 }).withMessage('At least one service is required'),
  body('services.*').isMongoId().withMessage('Each service id must be valid'),
  body('project').optional({ nullable: true }).isMongoId().withMessage('Project id must be valid'),
  body('address').trim().isLength({ min: 5 }).withMessage('Address is too short'),
  body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be positive'),
  body('status').optional().isIn(['new', 'in_progress', 'completed', 'cancelled']),
]

export const reviewValidators = [
  body('project').isMongoId().withMessage('Project id is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be from 1 to 5'),
  body('text').trim().isLength({ min: 10, max: 1000 }).withMessage('Text must be 10-1000 chars'),
]
