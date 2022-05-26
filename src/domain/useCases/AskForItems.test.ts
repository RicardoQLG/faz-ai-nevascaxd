import { GetAllItemsRepository } from '../protocols/GetAllItemsRepository'
import { SendToChat } from '../protocols/SendToChat'
import { AskForItems } from './AskForItems'

class SendToChatStub implements SendToChat {
  async send (message: string): Promise<void> {}
}

class GetAllItemsRepositoryStub implements GetAllItemsRepository {
  async get (): Promise<any> {
    return await Promise.resolve(['valid_task'])
  }
}

interface SutTypes {
  sendToChatStub: SendToChatStub
  getAllItemsRepositoryStub: GetAllItemsRepositoryStub
  sut: AskForItems
}

const makeSut = (): SutTypes => {
  const sendToChatStub = new SendToChatStub()
  const getAllItemsStub = new GetAllItemsRepositoryStub()
  const sut = new AskForItems(getAllItemsStub, sendToChatStub)
  return {
    sendToChatStub,
    getAllItemsRepositoryStub: getAllItemsStub,
    sut
  }
}

describe('AskForItems', () => {
  test('should call GetAllItems', async () => {
    const { sut, getAllItemsRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getAllItemsRepositoryStub, 'get')
    await sut.handle()
    expect(getSpy).toBeCalledTimes(1)
  })

  test('should throw an error if GetAllItems throws', async () => {
    const { sut, getAllItemsRepositoryStub } = makeSut()
    jest.spyOn(getAllItemsRepositoryStub, 'get').mockImplementationOnce(() => { throw new Error('any_error') })
    await expect(sut.handle()).rejects.toThrow(new Error('any_error'))
  })

  test('should call SendToChat with correct params', async () => {
    const { sut, sendToChatStub } = makeSut()
    const sendSpy = jest.spyOn(sendToChatStub, 'send')
    await sut.handle()
    expect(sendSpy).toBeCalledWith('valid_task')
  })

  test('should throw an error if SendToChat throws', async () => {
    const { sut, sendToChatStub } = makeSut()
    jest.spyOn(sendToChatStub, 'send').mockImplementationOnce(() => { throw new Error('any_error') })
    await expect(sut.handle()).rejects.toThrow(new Error('any_error'))
  })
})
