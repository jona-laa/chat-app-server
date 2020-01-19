const connectedUsers = require('./connectedUsers');

const chat = (io) => {
    io.on('connection', socket => {
        socket.on('connecting-user', username => {
            connectedUsers[socket.id] = username;
            socket.broadcast.emit('user-connected', username);
        });
    
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', connectedUsers[socket.id]);
            delete connectedUsers[socket.id]
        });
    
        socket.on('send-message', message => {
            socket.broadcast.emit('chat-message', { message: message, name: connectedUsers[socket.id] })
        });
    });
}

module.exports = chat;