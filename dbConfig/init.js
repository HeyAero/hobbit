const { Pool } = require("pg");

process.env.DATABASE_URL

let config;

if(process.env.DATABASE_URL) {
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
}


const pool = new Pool();

module.exports = pool;