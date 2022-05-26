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

  test('should call JSON parse with file data', async () => {
    const { sut } = makeSut()
    const parseSpy = jest.spyOn(JSON, 'parse')
    await sut.get()
    expect(parseSpy).toBeCalledWith('["valid_task"]')
  })
})
