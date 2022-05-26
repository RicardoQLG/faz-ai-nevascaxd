import { GetAllItemsRepository } from '../protocols/GetAllItemsRepository'

export class AskForItems {
  private readonly getAllItemsRepository: GetAllItemsRepository
  constructor (getAllItemsRepository: GetAllItemsRepository) {
    this.getAllItemsRepository = getAllItemsRepository
  }

  async handle (): Promise<any> {
    return await this.getAllItemsRepository.get()
  }
}
