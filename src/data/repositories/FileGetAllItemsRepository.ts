import fs from 'fs'
import { GetAllItemsRepository } from '../protocols/GetAllItemsRepository'

export class FileGetAllItemsRepository implements GetAllItemsRepository {
  async get (): Promise<string[]> {
    const fileData = await fs.readFileSync('tasks.json')
    return JSON.parse(fileData.toString())
  }
}
