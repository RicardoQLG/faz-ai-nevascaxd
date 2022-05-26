import { GetAllItemsRepository } from '../protocols/GetAllItemsRepository'

export class AskForItems {
  private readonly getAllItemsRepository: GetAllItemsRepository
  constructor (getAllItemsRepository: GetAllItemsRepository) {
    this.getAllItemsRepository = getAllItemsRepository
  }

  async handle (): Promise<string> {
    const tasks = await this.getAllItemsRepository.get()
    return `O nevasca tem que fazer: ${tasks.join(',')}`
  }
}
