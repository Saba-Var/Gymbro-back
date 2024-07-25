import { UserTypeEnum } from '@prisma/client'
import { body } from 'express-validator'

export const loginValidationSchema = [
  body('email').isEmail().withMessage('email_must_be_valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('password_should_not_be_empty'),
  body('userType')
    .isIn(Object.values(UserTypeEnum))
    .withMessage('must_be_valid'),
]
