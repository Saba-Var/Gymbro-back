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
    .optional()
    .isString()
    .trim()
    .isLength({ min: 4, max: 200 })
    .withMessage('Description must be between 4 and 200 characters')
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
]

export const modifyStaffPermissionValidation = [
  body('permissionIds')
    .isArray()
    .withMessage('Permission ids must be an array')
    .notEmpty()
    .withMessage('Permission ids are required'),
]
