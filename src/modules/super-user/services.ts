import type {
  CompanyCreateData,
  CompanySubscriptionCreationData,
  CompanySubscriptionEditData,
} from './types'
import { createFileUploadService } from 'services/file-upload.service'
import { ConflictError } from 'errors/conflict.error'
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

export const attachSubscriptionToCompanyService = async (
  data: CompanySubscriptionCreationData
) => {
  const newSubscription = await prisma.companySubscription.create({
    data,
  })

  return newSubscription
}

export const editCompanySubscriptionService = async (
  data: CompanySubscriptionEditData,
  companyId: number,
  subscriptionId: number
) => {
  const updatedSubscription = await prisma.companySubscription.update({
    where: {
      id: subscriptionId,
      companyId,
    },
    data,
  })

  return updatedSubscription
}

export const listCompanySubscriptionsService = async (id: number) => {
  const subscriptions = await prisma.companySubscription.findMany({
    where: {
      companyId: id,
    },
  })

  return subscriptions
}
