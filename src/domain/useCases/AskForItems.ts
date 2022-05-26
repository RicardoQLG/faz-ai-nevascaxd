import { GetAllItemRepository } from '../protocols/GetAllItemRepository'
import { SendToChat } from '../protocols/SendToChat'

export class AskForItems {
  private readonly getAllItemRepository: GetAllItemRepository
  private readonly sendToChatStub: SendToChat
  constructor (getAllItemRepository: GetAllItemRepository, sendToChatStub: SendToChat) {
    this.getAllItemRepository = getAllItemRepository
    this.sendToChatStub = sendToChatStub
  }

  async handle (): Promise<void> {
    const items = await this.getAllItemRepository.get()
    const promises = items.map(async item => await this.sendToChatStub.send(item))
    await Promise.all(promises)
  }
}
