import { readFileSync } from 'fs'
import { createServer } from 'https'
import { WebSocketServer, WebSocket } from 'ws'

const PORT = Number(process.env.PORT) || 9000
const CERT_PATH = process.env.CERT_PATH || '/etc/letsencrypt/live/s.blokk.cn'

const clients = new Set<WebSocket>()
let counter = 0

const server = createServer({
  cert: readFileSync(`${CERT_PATH}/fullchain.pem`),
  key: readFileSync(`${CERT_PATH}/privkey.pem`),
}, (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', online: clients.size, counter }))
    return
  }
  res.writeHead(404)
  res.end()
})

const wss = new WebSocketServer({ server })

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

  ws.on('close', () => {
    clients.delete(ws)
    console.log(`player left (${clients.size} online)`)
  })
})

setInterval(() => {
  counter++
  broadcast(JSON.stringify({ type: 'counter', value: counter }))
}, 1000)

server.listen(PORT, () => {
  console.log(`blokk-server listening on wss://localhost:${PORT}`)
})
