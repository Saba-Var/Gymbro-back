import { HTTP_UNAUTHORIZED } from 'constants/http-statuses'
import { CustomError } from 'errors/custom.error'
import { t } from 'i18next'

export class NotAuthorizedError extends CustomError {
  statusCode = HTTP_UNAUTHORIZED

  constructor() {
    super(t('not_authorized'))
    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors() {
    return { message: t('not_authorized') }
  }
}
