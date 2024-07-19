import { createFileUploadService } from 'services/file-upload.service'
import { ConflictError } from 'errors/conflict.error'
import type { CompanyCreateData } from './types'
import { generateMB } from 'utils/storage.util'
import { prisma } from 'config/prisma'
import { t } from 'i18next'

export const companyLogoUpload = createFileUploadService({
  maxFileSize: generateMB(2),
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
  destinationPath: './storage/public/images/company',
}).single('logo')

export const createCompanyService = async (companyData: CompanyCreateData) => {
  const isSameCompanyExist = await prisma.company.findFirst({
    where: {
      OR: [
        {
          title: companyData.title,
        },
        {
          email: companyData.email,
        },
      ],
    },
  })

  if (isSameCompanyExist) {
    throw new ConflictError(t('company_exists'))
  }

  const newCompany = await prisma.company.create({
    data: companyData,
  })

  return newCompany
}
