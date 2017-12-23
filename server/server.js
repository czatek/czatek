const socketio = require('socket.io');
const knex = require('knex');
const GoogleAuth = require('google-auth-library');
const dbConfig = require('./knexfile');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const auth = new GoogleAuth();
const client = new auth.OAuth2(CLIENT_ID, '', '');

const db = knex(dbConfig);
const io = socketio({
  path: '/api/chat',
  serveClient: false,
  cookie: false
});

io.use(async (socket, next) => {
  const token = socket.handshake.query.token;
  try {
    socket.tokenUser = await checkAuthToken(token);
    next();
  } catch (err) {
    next(new Error('Nie zalogowany'));
  }
});

io.on('connection', async socket => {
  const { sub: google_id, name } = socket.tokenUser;
  socket.user = await getUpdatedUser(google_id, name);

  socket.broadcast.emit('users', await getUsers());
  socket.on('getUserId', () => socket.emit('userId', socket.user.id));
  socket.on('getUsers', async () => socket.emit('users', await getUsers()));
  socket.on('getMessages', async () =>
    socket.emit('messages', await getMessages(socket.user.id))
  );

  socket.on('message', async data => {
    const message = [await saveMessage(data, socket.user)];
    if (data.to) {
      Object.values(io.sockets.connected)
        .filter(s => [data.to, socket.user.id].includes(s.user.id))
        .forEach(s => s.emit('messages', message));
    } else {
      io.sockets.emit('messages', message);
    }
  });
});

io.listen(process.env.BACKEND_WEB_PORT || 3000);

async function checkAuthToken(token) {
  return new Promise((resolve, reject) => {
    client.verifyIdToken(
      token,
      CLIENT_ID,
      (e, login) => (e ? reject(e) : resolve(login.getPayload()))
    );
  });
}

async function getUpdatedUser(google_id, name) {
  let result = await db('users')
    .where({ google_id })
    .update({ name })
    .returning(['id', 'name'])
    .get(0);

  if (!result) {
    result = await db('users')
      .insert({
        google_id,
        name
      })
      .returning(['id', 'name'])
      .get(0);
  }
  return { ...result };
}

async function getUsers() {
  return db('users')
    .select('id', 'name')
    .orderBy('name');
}

async function getMessages(user_id) {
  const result = await db('messages')
    .whereIn('messages.to', [null, user_id])
    .orWhere('messages.from', user_id)
    .join('users', 'users.id', 'messages.from')
    .select(
      'messages.from',
      'users.name',
      'messages.to',
      'messages.content',
      'messages.date'
    )
    .orderBy('date');
  return result.map(m => ({
    from: {
      id: m.from,
      name: m.name
    },
    to: m.to,
    content: m.content,
    date: m.date
  }));
}

async function saveMessage(message, user) {
  const result = await db('messages')
    .insert({
      from: user.id,
      ...message
    })
    .returning(['to', 'content', 'date'])
    .get(0);
  return {
    from: user,
    ...result
  };
}
