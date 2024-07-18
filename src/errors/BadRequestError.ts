import { HTTP_BAD_REQUEST } from 'constants/http-statuses'
import { CustomError } from 'errors/CustomError'

export class BadRequestError extends CustomError {
  statusCode = HTTP_BAD_REQUEST

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors() {
    return { message: this.message }
  }
}
