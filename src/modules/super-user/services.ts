import { createFileUploadService } from 'services/file-upload.service'
import type { Company, CompanySubscription } from '@prisma/client'
import { NotFoundError } from 'errors/not-found.error'
import { ConflictError } from 'errors/conflict.error'
import type { Query } from 'types/globals.types'
import { generateMB } from 'utils/storage.util'
import { paginate } from 'utils/paginate.util'
import { prisma } from 'config/prisma'
import { t } from 'i18next'
import type {
  CompanySubscriptionCreationData,
  CompanySubscriptionEditData,
  CompanyCreateData,
} from './types'

export const companyLogoUpload = createFileUploadService({
  maxFileSize: generateMB(2),
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
  destinationPath: './storage/public/images/companies',
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

export const deleteCompanyService = async (id: number) => {
  await findCompanyService(id)

  await prisma.company.delete({
    where: {
      id,
    },
  })
}

export const findCompanyService = async (id: number) => {
  const company = await prisma.company.findFirst({
    where: {
      id,
    },
  })

  if (!company) {
    throw new NotFoundError()
  }

  return company
}

export const listCompaniesService = async (query: Query<Company>) => {
  const companies = await paginate<Company>({
    model: 'Company',
    query,
  })

  return companies
}

export const attachSubscriptionToCompanyService = async (
  data: CompanySubscriptionCreationData
) => {
  await findCompanyService(data.companyId)

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
  await findCompanySubscriptionService(companyId, subscriptionId)

  const updatedSubscription = await prisma.companySubscription.update({
    where: {
      id: subscriptionId,
      companyId,
    },
    data,
  })

  return updatedSubscription
}

export const findCompanySubscriptionService = async (
  companyId: number,
  subscriptionId: number
) => {
  const subscription = await prisma.companySubscription.findFirst({
    where: {
      id: subscriptionId,
      companyId,
    },
  })

  if (!subscription) {
    throw new NotFoundError()
  }

  return subscription
}

export const listCompanySubscriptionsService = async (
  id: number,
  query: Query<CompanySubscription>
) => {
  const subscriptions = await paginate<CompanySubscription>({
    model: 'CompanySubscription',
    query,
    where: {
      companyId: id,
    },
  })

  return subscriptions
}

export const listAllCompaniesSubscriptionsService = async (
  query: Query<CompanySubscription>
) => {
  const paginatedResult = await paginate<CompanySubscription>({
    model: 'CompanySubscription',
    query,
  })

  return paginatedResult
}
