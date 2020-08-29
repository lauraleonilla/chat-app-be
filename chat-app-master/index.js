if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = require('./app')
const http = require('http')
const socketIo = require('socket.io')
const PORT = process.env.PORT || 3001

const server = http.createServer(app)
const io = socketIo.listen(server)

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('chat', data => {
    console.log(data)
    io.emit('chat', data)
  })
  socket.on('typing', () => {
    console.log('User typing')
    socket.broadcast.emit('typing')
  })
})
