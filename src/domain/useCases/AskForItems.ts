import { GetAllItemsRepository } from '../protocols/GetAllItemsRepository'
import { SendToChat } from '../protocols/SendToChat'

export class AskForItems {
  private readonly getAllItemsRepository: GetAllItemsRepository
  private readonly sendToChatStub: SendToChat
  constructor (getAllItemsRepository: GetAllItemsRepository, sendToChatStub: SendToChat) {
    this.getAllItemsRepository = getAllItemsRepository
    this.sendToChatStub = sendToChatStub
  }

  async handle (): Promise<void> {
    const items = await this.getAllItemsRepository.get()
    const promises = items.map(async item => await this.sendToChatStub.send(item))
    await Promise.all(promises)
  }
}
