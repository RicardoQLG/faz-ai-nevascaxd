export interface SocketResponse {
  message: string
  error?: Error
}

export interface Controller {
  handle: () => Promise<SocketResponse>
}
