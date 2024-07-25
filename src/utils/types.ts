import type { Prisma } from '@prisma/client'
import type { Query } from 'types/globals.types'

export type PaginatedResult<T> = {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type OrderDirection = 'asc' | 'desc'

export type PaginationOptions<T> = {
  where?: Partial<T>
  orderBy?: Partial<Record<keyof T, OrderDirection>>
  page?: string
  limit?: string
}

export type RangeQuery = {
  range: Record<string, { min?: string; max?: string }>
}

export type PaginateArgs = {
  model: Prisma.ModelName
  query: Query
}
