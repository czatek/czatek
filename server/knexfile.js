require('dotenv').config({
  path: '../.env'
});

module.exports = {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DB,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT
    },
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
};
