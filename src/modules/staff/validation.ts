import { CommissionType, SalaryType } from '@prisma/client'
import { body } from 'express-validator'

export const staffValidation = (
  args = {
    makeFieldsRequired: true,
  }
) => {
  const { makeFieldsRequired } = args

  return [
    body('firstName')
      .if((value) => makeFieldsRequired || value !== undefined)
      .trim()
      .isLength({ min: 3, max: 20 }),

    body('lastName')
      .if((value) => makeFieldsRequired || value !== undefined)
      .trim()
      .isLength({ min: 3, max: 20 }),

    body('email')
      .if((value) => makeFieldsRequired || value !== undefined)
      .trim()
      .isEmail()
      .withMessage('Email is not valid')
      .isLength({ min: 1 })
      .withMessage('Email is required'),

    body('isAdmin')
      .if((value) => makeFieldsRequired || value !== undefined)
      .optional()
      .isBoolean(),

    body('salaryType')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isIn(Object.values(SalaryType)),

    body('baseSalary')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isNumeric(),

    body('phoneNumber')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isMobilePhone('any')
      .withMessage('Phone number is not valid'),

    body('commissionAmount')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isNumeric(),

    body('commissionType')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isIn(Object.values(CommissionType)),

    body('privateNumber')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isLength({ min: 6, max: 20 })
      .withMessage('Private number must be between 6 and 20 characters'),
  ]
}
