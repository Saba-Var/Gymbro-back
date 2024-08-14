import type { Query } from 'types/globals.types'
import type { Prisma } from '@prisma/client'

export type PaginatedResult<T> = {
  data: T[]
  meta: {
    totalItems: number
    totalPages: number
    page: number
    limit: number
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

export type FilterQuery<Model> = {
  filter: Partial<Model>
}

export type PaginateArgs<Model> = {
  model: Prisma.ModelName
  query: Query<Model>
  where?: Partial<Model>
  include?: Record<string, boolean>
  select?: Partial<Record<keyof Model, boolean>>
}
