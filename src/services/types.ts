import type { FileExtension } from 'types/globals.types'
import type { Request } from 'express'

export interface FileUploadOptions {
  filename?: (req: Request, file: Express.Multer.File) => string
  allowedExtensions: FileExtension[]
  destinationPath: string
  maxFileSize: number
}
