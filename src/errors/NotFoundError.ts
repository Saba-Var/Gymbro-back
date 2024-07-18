import { HTTP_NOT_FOUND } from 'constants/http-statuses'
import { CustomError } from 'errors/CustomError'
import { t } from 'i18next'

export class NotFoundError extends CustomError {
  statusCode = HTTP_NOT_FOUND

  constructor(message = t('not_found')) {
    super(message)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return { message: this.message }
  }
}
