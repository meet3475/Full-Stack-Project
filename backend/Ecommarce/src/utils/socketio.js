const { Server } = require('socket.io');

const connectChat = () => {
    const io = new Server({
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.emit("welcome", "YOU ARE WELCOME FRUITABLE");

        socket.broadcast.emit("greeting", "HELLO ALL");
    });
    
    io.listen(8080);
}

module.exports = connectChat