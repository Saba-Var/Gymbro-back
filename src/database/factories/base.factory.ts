export abstract class BaseFactory<T, CreateInput> {
  abstract build(attrs?: Partial<CreateInput>): Promise<CreateInput>

  async create(
    params: {
      attrs?: Partial<CreateInput>
      count?: number
    } = {}
  ): Promise<T[]> {
    const { attrs = {}, count = 1 } = params

    const items = await Promise.all(
      Array(count)
        .fill(null)
        .map(async () => {
          const data = await this.build(attrs)
          return this.prismaCreate(data)
        })
    )

    return items
  }

  protected abstract prismaCreate(data: CreateInput): Promise<T>
}
