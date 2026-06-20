import { readFileSync, existsSync } from 'fs'
import { createServer as createHttpsServer } from 'https'
import { createServer as createHttpServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'

const PORT = Number(process.env.PORT) || 9000
const CERT_PATH = '/etc/letsencrypt/live/s.blokk.cn'

const hasCert = existsSync(`${CERT_PATH}/fullchain.pem`)

const server = hasCert
  ? createHttpsServer({
      cert: readFileSync(`${CERT_PATH}/fullchain.pem`),
      key: readFileSync(`${CERT_PATH}/privkey.pem`),
    })
  : createHttpServer()

const wss = new WebSocketServer({ server })

const rooms = new Map<string, Set<WebSocket>>()

wss.on('connection', (ws, req) => {
  const roomId = new URL(req.url!, `http://localhost`).searchParams.get('room') || 'default'

  if (!rooms.has(roomId)) rooms.set(roomId, new Set())
  const room = rooms.get(roomId)!
  room.add(ws)

  console.log(`[${roomId}] player joined (${room.size} online)`)

  ws.on('message', (data) => {
    for (const peer of room) {
      if (peer !== ws && peer.readyState === WebSocket.OPEN) {
        peer.send(data)
      }
    }
  })

  ws.on('close', () => {
    room.delete(ws)
    if (room.size === 0) rooms.delete(roomId)
    console.log(`[${roomId}] player left (${room.size} online)`)
  })
})

server.listen(PORT, () => {
  console.log(`blokk-server listening on ${hasCert ? 'wss' : 'ws'}://localhost:${PORT}`)
})
