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

  test('should return an error if AskForItems throws', async () => {
    const { sut, askForItemsStub } = makeSut()
    jest.spyOn(askForItemsStub, 'handle').mockImplementation(() => { throw new Error('any_error') })
    const response = await sut.handle()
    expect(response).toEqual({
      message: '',
      error: new Error('any_error')
    })
  })

  test('should return a message on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual({
      message: 'valid_message'
    })
  })
})
