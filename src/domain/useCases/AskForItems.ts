import { GetAllItemRepository } from '../protocols/GetAllItemRepository'

export class AskForItems {
  private readonly getAllItemRepository: GetAllItemRepository
  constructor (getAllItemRepository: GetAllItemRepository) {
    this.getAllItemRepository = getAllItemRepository
  }

  async handle (): Promise<void> {
    await this.getAllItemRepository.get()
  }
}
