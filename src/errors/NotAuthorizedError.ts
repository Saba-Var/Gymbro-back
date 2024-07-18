import { CustomError } from 'errors/CustomError'
import { t } from 'i18next'

export class NotAuthorizedError extends CustomError {
  statusCode = 401

  constructor() {
    super(t('not_authorized'))
    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors() {
    return { message: t('not_authorized') }
  }
}
