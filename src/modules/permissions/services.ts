import type { Permission } from '@prisma/client'
import type { Query } from 'types/globals.types'
import { paginate } from 'utils/paginate.util'

export const listPermissionsService = async (query: Query<Permission>) => {
  const paginatedResult = await paginate<Permission>({
    model: 'Permission',
    query,
  })

  return paginatedResult
}
