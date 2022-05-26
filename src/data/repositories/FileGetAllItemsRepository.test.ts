import { FileGetAllItemsRepository } from './FileGetAllItemsRepository'
import * as fs from 'fs'

jest.mock('fs', () => ({
  readFileSync: jest.fn().mockReturnValue(Buffer.from('["valid_task"]'))
}))
const mockedFs = fs as jest.Mocked<typeof fs>

interface SutTypes {
  sut: FileGetAllItemsRepository
}

const makeSut = (): SutTypes => {
  const sut = new FileGetAllItemsRepository()
  return {
    sut
  }
}

describe('FileGetAllItemsRepository', () => {
  test('should call fs with correct filename', async () => {
    const { sut } = makeSut()
    await sut.get()
    expect(mockedFs.readFileSync).toBeCalledWith('tasks.json')
  })
})
