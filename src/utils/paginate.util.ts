/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PAGE_LIMIT, PAGE_NUMBER } from 'constants/pagionation'
import { prisma } from 'config/prisma'
import type {
  PaginationOptions,
  PaginatedResult,
  OrderDirection,
  PaginateArgs,
} from './types'

async function paginate<T>(args: PaginateArgs<T>): Promise<PaginatedResult<T>> {
  const model = args.model

  const page = args?.query?.page ? +args?.query?.page : PAGE_NUMBER
  const limit = args?.query?.limit ? +args?.query?.limit : PAGE_LIMIT
  const skip = (page - 1) * limit

  const where = generateWhereFromFilter(args?.query?.filter, args?.query?.range)

  const orderBy = generateOrderByFromSort(args?.query?.sort)

  const [totalItems, data] = await Promise.all([
    // @ts-ignore
    prisma[model].count({ where }),
    // @ts-ignore
    prisma[model].findMany({
      take: limit,
      orderBy,
      where: {
        ...where,
        ...(args.where || {}),
      },
      skip,
      include: args.include,
    }),
  ])

  const totalPages = Math.ceil(totalItems / limit)

  return {
    data,
    meta: {
      totalPages,
      totalItems,
      limit,
      page,
    },
  }
}

export { paginate }

const generateWhereFromFilter = <T>(
  filter: T,
  range?: Record<string, { min?: string; max?: string }>
): PaginationOptions<T>['where'] => {
  const where: PaginationOptions<T>['where'] = {}
  type WhereValue = T[Extract<keyof T, string>]

  for (const key in filter) {
    if (filter[key]) {
      if (!isNaN(Number(filter[key]))) {
        where[key] = Number(filter[key]) as WhereValue
      } else if (filter[key] === 'true' || filter[key] === 'false') {
        where[key] = (filter[key] === 'true') as WhereValue
      } else {
        where[key] = filter[key]
      }
    }
  }

  if (range) {
    for (const fieldName in range) {
      const { min, max } = range[fieldName]
      if (min !== undefined || max !== undefined) {
        // @ts-ignore
        where[fieldName] = {
          ...(min !== undefined && { gte: Number(min) }),
          ...(max !== undefined && { lte: Number(max) }),
        } as WhereValue
      }
    }
  }

  return where
}

const generateOrderByFromSort = <T>(
  sort: T
): PaginationOptions<T>['orderBy'] => {
  const orderBy: PaginationOptions<T>['orderBy'] = {}

  for (const key in sort) {
    orderBy[key] = sort[key] as OrderDirection | undefined
  }

  // @ts-ignore
  if (!orderBy.id) {
    // @ts-ignore
    orderBy.id = 'desc' as OrderDirection
  }

  return orderBy
}
