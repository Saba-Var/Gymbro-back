import { CustomError } from 'errors/CustomError'
import { t } from 'i18next'

export class DatabaseConnectionError extends CustomError {
  statusCode = 500

  constructor(private reason = t('database_connection_error')) {
    super(reason)
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return { message: this.reason }
  }
}
