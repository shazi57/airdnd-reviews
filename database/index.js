const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'airdnd',
  password: 'postgres',
  port: '5432'
})

module.exports = pool;