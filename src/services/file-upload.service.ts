import multer, { type FileFilterCallback } from 'multer'
import type { FileExtension } from 'types/globals.types'
import { generateFileDateName } from 'utils/dates.util'
import type { FileUploadOptions } from './types'
import type { Request } from 'express'
import { randomUUID } from 'crypto'
import { t } from 'i18next'
import path from 'path'
import fs from 'fs'

export const createFileUploadService = (options: FileUploadOptions) => {
  const storage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
      try {
        fs.mkdir(options.destinationPath, { recursive: true }, (err) => {
          if (!err) {
            cb(null, options.destinationPath)
          }
        })
      } catch (error) {
        cb(error as Error, options.destinationPath)
      }
    },
    filename: (req, file, cb) => {
      const formattedName = generateFileDateName() + '_' + randomUUID()

      if (options.filename) {
        const customFilename = options.filename(req, file)
        cb(null, customFilename)
      } else {
        cb(
          null,
          file.fieldname + '_' + formattedName + path.extname(file.originalname)
        )
      }
    },
  })

  const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname).toLowerCase() as FileExtension
    if (options.allowedExtensions.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error(t('file_type_not_allowed')))
    }
  }

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: options.maxFileSize,
    },
  })

  return upload
}
