import multer, { type FileFilterCallback } from 'multer'
import type { FileExtension } from 'types/globals.types'
import type { FileUploadOptions } from './types'
import type { Request } from 'express'
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
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

      if (options.filename) {
        const customFilename = options.filename(req, file) + '-' + uniqueSuffix
        cb(null, customFilename)
      } else {
        cb(
          null,
          file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
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
      cb(new Error('File type not allowed'))
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
