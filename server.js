const app = require('express')();
const http = require('http').Server(app);
const logger = require('./middleware/logger');
const io = require('socket.io')(http);
const port = 4200;
const cors = require('cors');
const connectedUsers = require('./connectedUsers');
var users = require('./routes/users');
app.use(cors());
app.use(logger);
app.use('/users', users);

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

http.listen(port, () => console.log('Server running on port ', port));