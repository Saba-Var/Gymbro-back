import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

export class Password {
  static async toHash(password: string, scryptHash?: string): Promise<string> {
    const salt = scryptHash || randomBytes(10).toString('hex')

    const buffer = (await scryptAsync(password, salt, 64)) as Buffer

    return `${buffer.toString('hex')}.${salt}`
  }

  static async compare(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const [, salt] = storedPassword.split('.')

    const hashedSuppliedPassword = await this.toHash(suppliedPassword, salt)

    return hashedSuppliedPassword === storedPassword
  }
}
