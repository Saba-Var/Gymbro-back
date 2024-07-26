import { body } from 'express-validator'

export const rolesValidation = ({ makeFieldsRequired = true } = {}) => [
  body('name')
    .if((value) => makeFieldsRequired || value !== undefined)
    .isString()
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage('Name must be between 3 and 40 characters')
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

  body('permissionIds')
    .if((value) => makeFieldsRequired || value !== undefined)
    .isArray()
    .notEmpty()
    .withMessage('Permission ids are required'),
]

export const modifyStaffRoleValidation = [
  body('roleIds')
    .isArray()
    .withMessage('Role ids must be an array')
    .notEmpty()
    .withMessage('Role ids are required'),

  body('staffId')
    .isNumeric()
    .withMessage('Staff id must be a number')
    .notEmpty()
    .withMessage('Staff id is required'),
]
