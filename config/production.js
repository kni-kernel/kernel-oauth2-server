module.exports = {
  database: {
    engine: process.env.DATABASE_ENGINE,
    host: process.env.DATABASE_HOST,
    maxConnections: process.env.DATABASE_MAX_CONNECTIONS,
    maxIdleTime: process.env.DATABASE_MAX_IDLE_TIME,
    minConnections: process.env.DATABASE_MIN_CONNECTIONS,
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
  },
  oauth: {
    port: process.env.OAUTH_PORT,
    debug: false,
    dsn: process.env.OAUTH_DSN,
  },
};
