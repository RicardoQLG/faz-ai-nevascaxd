import fs from 'fs'
import { GetAllItemsRepository } from '../../domain/protocols/GetAllItemsRepository'

export class FileGetAllItemsRepository implements GetAllItemsRepository {
  async get (): Promise<any> {
    await fs.readFileSync('tasks.json')
  }
}
