const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
    console.log('New user connected: ' + socket.id);

    socket.on('call-user', data => {
        io.to(data.to).emit('call-made', {
            offer: data.offer,
            socket: socket.id
        });
    });

    socket.on('make-answer', data => {
        io.to(data.to).emit('answer-made', {
            answer: data.answer,
            socket: socket.id
        });
    });

    socket.on('ice-candidate', data => {
        io.to(data.to).emit('ice-candidate', {
            candidate: data.candidate,
            socket: socket.id
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
