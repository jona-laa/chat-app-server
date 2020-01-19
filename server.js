const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
var users = require('./routes/users');
require('./chat.js')(io);
const morgan = require('./middleware/morgan');
const logger = require('./middleware/logger');

app.use(cors());
app.use(morgan);
app.use(logger);
app.use('/users', users);

const port = 4200;
http.listen(port, () => console.log('Server running on port ', port));