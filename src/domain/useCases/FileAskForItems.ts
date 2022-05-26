import { GetAllItemsRepository } from '../../data/protocols/GetAllItemsRepository'
import { AskForItems } from '../protocols/AskForItems'

export class FileAskForItems implements AskForItems {
  private readonly getAllItemsRepository: GetAllItemsRepository
  constructor (getAllItemsRepository: GetAllItemsRepository) {
    this.getAllItemsRepository = getAllItemsRepository
  }

  async handle (): Promise<string> {
    const tasks = await this.getAllItemsRepository.get()
    if (tasks.length === 1) {
      return `NevascaXd, você já ${tasks.join('')}?`
    }
    const lastTask = String(tasks.pop())
    return `NevascaXd, você já ${tasks.join(', ')} e ${lastTask}?`
  }
}
