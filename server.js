const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const db = process.env.MONGODB_KEY;

app.use(express.json());
app.use(cors());

//DB
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

//routes
app.use('/api/message', require('./routes/api/Message'));
app.use('/api/user', require('./routes/api/User'));

//socket
const {
  getUsers,
  checkifUserExists,
  addUser,
  removeUser,
} = require('./utils/activetokens');

io.on('connection', socket => {
  socket.on('joinChat', () => {
    const user = socket.handshake.query.user;
    if (user && !checkifUserExists(user)) {
      //broadcast
      addUser(user);
    }
    io.emit('activeUsers', getUsers());
  });

  socket.on('chatMessage', (chatMessage) => {
    socket.broadcast.emit('message', chatMessage);
  });

  socket.on('disconnect', () => {
    const user = socket.handshake.query.user;
    removeUser(user);
    io.emit('activeUsers', getUsers());
  })
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  })
}


const port = process.env.PORT || 5000;
server.listen(port, console.log(`Server started on port ${port}`));