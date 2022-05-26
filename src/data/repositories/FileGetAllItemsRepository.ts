import fs from 'fs'
import { GetAllItemsRepository } from '../../domain/protocols/GetAllItemsRepository'

export class FileGetAllItemsRepository implements GetAllItemsRepository {
  async get (): Promise<any> {
    const fileData = await fs.readFileSync('tasks.json')
    JSON.parse(fileData.toString())
  }
}
