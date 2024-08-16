import { SalaryType } from '@prisma/client'
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

    body('address')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isLength({ min: 4, max: 100 })
      .withMessage('Address must be between 4 and 100 characters'),

    body('privateNumber')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isLength({ min: 6, max: 20 })
      .withMessage('Private number must be between 6 and 20 characters'),

    body('iban')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isLength({ min: 7, max: 20 })
      .withMessage('iban must be between 7 and 20 characters'),

    body('currencyId')
      .if((value) => makeFieldsRequired || value !== undefined)
      .isNumeric(),
  ]
}
