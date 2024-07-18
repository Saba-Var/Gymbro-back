import { HTTP_CONFLICT } from 'constants/http-statuses'
import { CustomError } from 'errors/CustomError'
import { t } from 'i18next'

export class ConflictError extends CustomError {
  statusCode = HTTP_CONFLICT

  constructor(message = t('conflict')) {
    super(message)
    Object.setPrototypeOf(this, ConflictError.prototype)
  }

  serializeErrors() {
    return { message: this.message }
  }
}
