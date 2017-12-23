const socketio = require('socket.io');
const mongoose = require('mongoose');
const GoogleAuth = require('google-auth-library');

const CLIENT_ID = '977466048676-r6pf13bs4qi689g39arlmf23hbot7loe.apps.googleusercontent.com';
const auth = new GoogleAuth();
const client = new auth.OAuth2(CLIENT_ID, '', '');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/czatek', { useMongoClient: true });

const userSchema = mongoose.Schema({
  id: String,
  name: String,
});
const User = mongoose.model('User', userSchema);

const messageSchema = mongoose.Schema({
  from: {
    id: String,
    name: String,
  },
  to: String,
  content: String,
  date: Date,
});
const Message = mongoose.model('Message', messageSchema);

const io = socketio({
  path: '/api/chat',
  serveClient: false,
  cookie: false,
});

io.use(async (socket, next) => {
  const token = socket.handshake.query.token;
  try {
    socket.tokenUser = await checkAuthToken(token);
    next();
  } catch (err) {
    next(new Error("Nie zalogowany"));
  }
});

io.on('connection', async socket => {
  const {sub: id, name} = socket.tokenUser;
  const dbUser = await User.findOneAndUpdate({id}, {name}, {
    new: true,
    upsert: true,
  });
  socket.user = {
    id: dbUser._id,
    name: dbUser.name
  };

  const users = (await User.find({}, {name: true}).lean())
  .map(u => ({id: u._id, name: u.name}));

  socket.broadcast.emit('users', users);

  socket.on('getUserId', () => socket.emit('userId', socket.user.id));

  socket.on('getUsers', async () => {
    const users = (await User.find({}, {name: true}).lean())
    .map(u => ({id: u._id, name: u.name}));

    socket.emit('users', users);
  });

  socket.on('getMessages', async () => {
    const messages = (await Message.find({ $or: [{to: ''}, {to: socket.user.id}, {'from.id': socket.user.id}] }).lean())
    .map(({_id, __v, ...m}) => ({...m}));

    socket.emit('messages', messages);
  });

  socket.on('message', async ({to, content}) => {
    const savedMessage = await Message.create({
      from: socket.user,
      to,
      content,
      date: new Date(),
    });
    const {_id, __v, ...message} = savedMessage.toObject();

    if (to === '') {
      io.sockets.emit('messages', [message]);
    } else {
      Object.values(io.sockets.connected)
        .filter(s => s.user.id === to)
        .forEach(s => s.emit('messages', [message]));
      socket.emit('messages', [message]);
    }
  });
});

async function checkAuthToken(token) {
  return new Promise((resolve, reject) => {
    client.verifyIdToken(
      token,
      CLIENT_ID,
      (e, login) => {
        if (e) {
          reject(e);
        } else {
          resolve(login.getPayload());
        }
      });
  });
}

io.listen(3000);
