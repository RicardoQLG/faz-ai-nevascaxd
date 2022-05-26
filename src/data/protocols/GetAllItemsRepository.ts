export interface GetAllItemsRepository {
  get: () => Promise<string[]>
}
