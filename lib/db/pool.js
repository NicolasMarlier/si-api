const { Pool } = require('pg')
 
DEV_POSTGRES_URL = "postgres://postgres:postgres@localhost:5432/postgres"
const credentials = {
  connectionString: process.env.DATABASE_URL || DEV_POSTGRES_URL
}

const pool = new Pool(credentials)
 
module.exports = {
  pool
}