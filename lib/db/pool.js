const { Pool } = require('pg')
 
DEV_POSTGRES_URL = "postgres://postgres:postgres@localhost:5432/postgres"
let credentials = {
  connectionString: DEV_POSTGRES_URL
}
if(process.env.DATABASE_URL) {
  credentials = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const pool = new Pool(credentials)
 
module.exports = {
  pool
}