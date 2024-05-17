import { body } from 'express-validator'

export const signInValidation = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must be between 4 and 20 characters'),
]
