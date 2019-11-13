require('dotenv').config()
const { Pool } = require('pg')

switch (process.env.NODE_ENV) {
  case 'development':
    pool = new Pool({
      user: process.env.DEVELOPMENT_DB_USER,
      host: process.env.DEVELOPMENT_DB_HOST,
      database: process.env.DEVELOPMENT_DB_NAME,
      password: process.env.DEVELOPMENT_DB_PASSWORD,
      port: process.env.DEVELOPMENT_DB_PORT,
    })
    break

  case 'test':
    pool = new Pool({
      user: process.env.TEST_DB_USER,
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB_NAME,
      password: process.env.TEST_DB_PASSWORD,
      port: process.env.TEST_DB_PORT,
    })
    break

  default:
    pool = new Pool({
      user: process.env.PRODUCTION_DB_USER,
      host: process.env.PRODUCTION_DB_HOST,
      database: process.env.PRODUCTION_DB_NAME,
      password: process.env.PRODUCTION_DB_PASSWORD,
      port: process.env.PRODUCTION_DB_PORT,
    })
}

module.exports = pool
