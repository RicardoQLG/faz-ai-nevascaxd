import { AskForItems } from '../../domain/protocols/AskForItems'
import { AskForItemsController } from './AskForItemsController'

class AskForItemsStub implements AskForItems {
  async handle (): Promise<string> {
    return 'valid_message'
  }
}

interface SutTypes {
  askForItemsStub: AskForItemsStub
  sut: AskForItemsController
}

const makeSut = (): SutTypes => {
  const askForItemsStub = new AskForItemsStub()
  const sut = new AskForItemsController(askForItemsStub)
  return {
    askForItemsStub,
    sut
  }
}

describe('AskForItemsController', () => {
  test('should call AskForItems', async () => {
    const { sut, askForItemsStub } = makeSut()
    const handleSpy = jest.spyOn(askForItemsStub, 'handle')
    await sut.handle()
    expect(handleSpy).toBeCalledTimes(1)
  })
})
