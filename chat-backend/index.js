const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

app.use(express.json())

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});



app.post('/talkjs', (req, res) => {
    io.emit('incoming chat', req.body)
    console.log(req.body)
    res.status(200).send('OK')
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () =>{
    console.log("user disconnected")
  })
  
});


server.listen(8080, () => {
  console.log('listening on *:8080');
});