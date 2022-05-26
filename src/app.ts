import { Socket } from 'net'
import dotenv from 'dotenv'
import { AskForItemsController } from './presentation/controllers/AskForItemsController'
import { FileAskForItems } from './domain/useCases/FileAskForItems'
import { FileGetAllItemsRepository } from './data/repositories/FileGetAllItemsRepository'
dotenv.config()

export const app = async (client: Socket): Promise<void> => {
  const twitchUsername = String(process.env.TWITCH_USERNAME)
  const twitchPassword = String(process.env.TWITCH_PASSWORD)

  const getAllItemsRepository = new FileGetAllItemsRepository()
  const askForItems = new FileAskForItems(getAllItemsRepository)
  const controller = new AskForItemsController(askForItems)
  const askMessage = await controller.handle()

  await new Promise((resolve) => {
    client.write('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands\r\n')
    client.write(`PASS oauth:${twitchPassword}\r\n`)
    client.write(`NICK ${twitchUsername}\r\n`)
    client.write('JOIN #nevascaxd\r\n')
    client.once('data', () => resolve(null))
  })
  client.on('data', data => {
    const match = data.toString().match(/([\S]+\s[\S]+)\s([\S]+)\s([\S]+)\s:(.*)/)
    if (!match) return
    const [,, type, channel] = match
    if (type === 'PING') {
      client.write('PONG :tmi.twitch.tv\r\n')
      return
    }
    console.log(`PRIVMSG ${channel} :${askMessage.message}\r\n`)
    client.write(`PRIVMSG ${channel} :${askMessage.message}\r\n`)
    client.end()
  })
}
