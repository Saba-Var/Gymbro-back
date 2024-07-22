import type { UserTypeEnum } from 'enums/user.enums'
import type { LoginData } from 'types/globals.types'

export type logInTestCommandArgs = Partial<
  Omit<LoginData & { statusCode: number }, 'userType'>
> & {
  userType: UserTypeEnum
}
