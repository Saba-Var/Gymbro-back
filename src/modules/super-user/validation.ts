import { body } from 'express-validator'

export const createCompanySchema = [
  body('email').isEmail(),
  body('title')
    .isString()
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage('Title must be between 4 and 40 characters'),
  body('city').isString(),
  body('country').isString(),
  body('address').isString(),
  body('websiteUrl').isString().isURL().withMessage('Invalid URL'),
  body('description')
    .isString()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
]
