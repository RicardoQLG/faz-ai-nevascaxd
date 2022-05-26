import { GetAllItemRepository } from '../protocols/GetAllItemRepository'
import { AskForItems } from './AskForItems'

class GetAllItemRepositoryStub implements GetAllItemRepository {
  async get (): Promise<any> {
    return await Promise.resolve(['valid_task'])
  }
}

interface SutTypes {
  getAllItemRepositoryStub: GetAllItemRepositoryStub
  sut: AskForItems
}

const makeSut = (): SutTypes => {
  const getAllItemsStub = new GetAllItemRepositoryStub()
  const sut = new AskForItems(getAllItemsStub)
  return {
    getAllItemRepositoryStub: getAllItemsStub,
    sut
  }
}

describe('AskForItems', () => {
  test('should call GetAllItems', async () => {
    const { sut, getAllItemRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getAllItemRepositoryStub, 'get')
    await sut.handle()
    expect(getSpy).toBeCalledTimes(1)
  })
})
