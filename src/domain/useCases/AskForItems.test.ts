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

  test('should call SendToChat with correct params', async () => {
    const { sut, sendToChatStub } = makeSut()
    const sendSpy = jest.spyOn(sendToChatStub, 'send')
    await sut.handle()
    expect(sendSpy).toBeCalledWith('valid_task')
  })
})
