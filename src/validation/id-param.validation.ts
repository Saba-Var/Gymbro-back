import { param } from 'express-validator'

export const idParamValidation = ({ fieldName } = { fieldName: 'id' }) => {
  return [
    param(fieldName)
      .isInt()
      .withMessage(`${fieldName} must be an integer`)
      .notEmpty()
      .withMessage(`${fieldName} is required`),
  ]
}
