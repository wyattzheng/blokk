import { readFileSync } from 'fs'
import { createServer } from 'https'
import { WebSocketServer, WebSocket } from 'ws'

const PORT = Number(process.env.PORT) || 9000
const CERT_PATH = process.env.CERT_PATH || '/etc/letsencrypt/live/s.blokk.cn'

const server = createServer({
  cert: readFileSync(`${CERT_PATH}/fullchain.pem`),
  key: readFileSync(`${CERT_PATH}/privkey.pem`),
})

const wss = new WebSocketServer({ server })

const clients = new Set<WebSocket>()
let counter = 0

function broadcast(data: string) {
  for (const ws of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data)
    }
  }
}

wss.on('connection', (ws) => {
  clients.add(ws)
  console.log(`player joined (${clients.size} online)`)

  ws.send(JSON.stringify({ type: 'counter', value: counter }))

  ws.on('message', (data) => {
    const msg = JSON.parse(data.toString())
    if (msg.type === 'increment') {
      counter++
      broadcast(JSON.stringify({ type: 'counter', value: counter }))
    }
  })

  ws.on('close', () => {
    clients.delete(ws)
    console.log(`player left (${clients.size} online)`)
  })
})

server.listen(PORT, () => {
  console.log(`blokk-server listening on wss://localhost:${PORT}`)
})
