import { AskForItems } from '../../domain/protocols/AskForItems'
import { Controller, SocketResponse } from '../protocols/Controller'

export class AskForItemsController implements Controller {
  private readonly askForItems: AskForItems
  constructor (askForItems: AskForItems) {
    this.askForItems = askForItems
  }

  async handle (): Promise<SocketResponse> {
    try {
      await this.askForItems.handle()
      return {
        message: ''
      }
    } catch (error) {
      return {
        message: '',
        error
      }
    }
  }
}
