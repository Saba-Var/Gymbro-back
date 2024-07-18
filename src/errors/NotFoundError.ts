import { CustomError } from 'errors/CustomError'
import { t } from 'i18next'

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor(message = t('not_found')) {
    super(message)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return { message: this.message }
  }
}
