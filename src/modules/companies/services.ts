import { NotFoundError } from 'errors/not-found.error'
import { prisma } from 'config/prisma'
import { t } from 'i18next'

export const findCompanyService = async (companyId: number) => {
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  })

  if (!company) {
    throw new NotFoundError(t('company_not_found'))
  }

  return company
}
