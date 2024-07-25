import { MAX_PAGE_LIMIT } from 'constants/pagionation'
import { query } from 'express-validator'

export const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: MAX_PAGE_LIMIT })
    .withMessage(
      `limit must be a positive integer between 1 and ${MAX_PAGE_LIMIT}`
    ),
]
