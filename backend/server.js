const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.get('/',(req,res)=>{
    res.send("welcome to chat-room");
});

io.on('connection', (socket) => {
    console.log('New client connected');

  
    socket.on('message', (message) => {
        console.log('Received message:', message);
      
        io.emit('message', message);
    });

   
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
