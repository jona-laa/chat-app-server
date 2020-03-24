const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
var usersRoute = require('./routes/users');
require('./chat.js')(io);
const morgan = require('./middleware/morgan');
const logger = require('./middleware/logger');

app.use(cors());
app.use(morgan);
app.use(logger);
app.use(usersRoute);

const PORT = process.env.PORT || 4200;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));