import { GetAllItemsRepository } from '../protocols/GetAllItemsRepository'
import { AskForItems } from './AskForItems'

class GetAllItemsRepositoryStub implements GetAllItemsRepository {
  async get (): Promise<any> {
    return await Promise.resolve(['valid_task'])
  }
}

interface SutTypes {
  getAllItemsRepositoryStub: GetAllItemsRepositoryStub
  sut: AskForItems
}

const makeSut = (): SutTypes => {
  const getAllItemsStub = new GetAllItemsRepositoryStub()
  const sut = new AskForItems(getAllItemsStub)
  return {
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

  test('should return list of tasks', async () => {
    const { sut } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual(['valid_task'])
  })
})
