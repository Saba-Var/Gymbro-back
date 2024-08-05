import { body } from 'express-validator'

export const modifyPermissionValidation = [
  body('key').trim().notEmpty().withMessage('key_is_required'),
]
