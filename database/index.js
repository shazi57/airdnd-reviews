const { Pool } = require('pg');

const pool = new Pool();

pool.query('PREPARE readreview (int) AS SELECT * FROM reviews WHERE room_id = $1');

module.exports = pool;