const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const {Server} = require('socket.io');


const app = express();

// console.log(__dirname);
const server = createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname,'/index.html'));
});

io.on('connection',(socket)=>{
    console.log('User Connected.')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
    socket.on('disconnect',()=>{
        console.log('User disconnected.')
    })
})





server.listen(5000,()=>{
    console.log("Server is running on port 5000")
})