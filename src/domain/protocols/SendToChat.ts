export interface SendToChat {
  send: (message: string) => Promise<void>
}
