export interface SocketResponse {
  message: string
}

export interface Controller {
  handle: () => Promise<SocketResponse>
}
