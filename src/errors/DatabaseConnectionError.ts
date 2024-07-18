import { HTTP_INTERNAL_SERVER_ERROR } from 'constants/http-statuses'
import { CustomError } from 'errors/CustomError'
import { t } from 'i18next'

export class DatabaseConnectionError extends CustomError {
  statusCode = HTTP_INTERNAL_SERVER_ERROR

  constructor(private reason = t('database_connection_error')) {
    super(reason)
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return { message: this.reason }
  }
}
