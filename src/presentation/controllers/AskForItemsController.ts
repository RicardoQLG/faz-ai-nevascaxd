import { AskForItems } from '../../domain/protocols/AskForItems'
import { Controller, SocketResponse } from '../protocols/Controller'

export class AskForItemsController implements Controller {
  private readonly askForItems: AskForItems
  constructor (askForItems: AskForItems) {
    this.askForItems = askForItems
  }

  async handle (): Promise<SocketResponse> {
    await this.askForItems.handle()
    return {
      message: ''
    }
  }
}
