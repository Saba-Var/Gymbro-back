import { body } from 'express-validator'

export const rolesValidation = ({ makeFieldsRequired = true } = {}) => [
  body('name')
    .if((value) => makeFieldsRequired || value !== undefined)
    .isString()
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage('Name must be between 4 and 40 characters')
    .notEmpty()
    .withMessage('Name is required'),

  body('description')
    .if((value) => makeFieldsRequired || value !== undefined)
    .isString()
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage('Description must be between 4 and 40 characters')
    .notEmpty()
    .withMessage('Description is required'),
]
