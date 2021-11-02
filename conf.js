const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_SCHEMA,
  DB_PASSWORD,
  API_KEY_BOARDATLAS,
  BACK_PORT,
  /* JWT_SALTROUNDS,
  JWT_SECRET,
  FRONTEND_URL,
  ADMIN_URL, */
} = process.env;

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
});

module.exports = {
  db,
  apiBoardAtlas: API_KEY_BOARDATLAS,
  backPort: BACK_PORT,
};
