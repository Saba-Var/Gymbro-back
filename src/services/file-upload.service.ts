import multer, { type FileFilterCallback } from 'multer'
import type { Request } from 'express'
import path from 'path'

interface FileUploadOptions {
  filename?: (req: Request, file: Express.Multer.File) => string
  allowedExtensions: string[]
  destinationPath: string
  maxFileSize: number
}

export function createFileUploadService(options: FileUploadOptions) {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, options.destinationPath)
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
    const ext = path.extname(file.originalname).toLowerCase()
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
