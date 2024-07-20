import { body, param } from 'express-validator'

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

export const companySubscriptionValidation = (isCreating = true) => [
  param('companyId')
    .if((value) => isCreating || value !== undefined)
    .isInt()
    .withMessage('Company ID must be an integer')
    .notEmpty()
    .withMessage('Company ID is required'),

  body('startDate')
    .if((value) => isCreating || value !== undefined)
    .isISO8601()
    .withMessage('Start date must be a valid date')
    .notEmpty()
    .withMessage('Start date is required'),

  body('endDate')
    .if((value) => isCreating || value !== undefined)
    .isISO8601()
    .withMessage('End date must be a valid date')
    .notEmpty()
    .withMessage('End date is required')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date')
      }
      return true
    }),

  body('isActive')
    .if((value) => isCreating || value !== undefined)
    .isBoolean()
    .withMessage('Is active must be a boolean')
    .notEmpty()
    .withMessage('Is active is required'),

  body('totalPrice')
    .if((value) => isCreating || value !== undefined)
    .isFloat({ min: 0 })
    .withMessage('Total price must be a positive number')
    .notEmpty()
    .withMessage('Total price is required'),
]
