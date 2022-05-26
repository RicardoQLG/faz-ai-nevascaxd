import { connect, NetConnectOpts } from 'net'
import { app } from './app'

const options: NetConnectOpts = {
  host: 'irc.twitch.tv',
  port: 6667
}

const client = connect(options)
client.pipe(process.stdout)
void app(client)
