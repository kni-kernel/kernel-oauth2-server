module.exports = {
  database: {
    engine: process.env.DATABASE_ENGINE || "postgres",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    maxConnections: process.env.DATABASE_MAX_CONNECTIONS || 25,
    maxIdleTime: process.env.DATABASE_MAX_IDLE_TIME || 30000,
    minConnections: process.env.DATABASE_MIN_CONNECTIONS || 1,
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
  },
  oauth: {
    port: 5000,
    debug: false,
    dsn: process.env.OAUTH_DSN,
  },
};
