const app = require('express')();
const http = require('http').Server(app);
const logger = require('./middleware/logger');
const io = require('socket.io')(http);
const port = 4200;
const cors = require('cors');
var users = require('./routes/users');
require('./chat.js')(io);

app.use(cors());
app.use(logger);
app.use('/users', users);

http.listen(port, () => console.log('Server running on port ', port));