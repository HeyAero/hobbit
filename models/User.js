const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');

class User {
  constructor (data) {
    this.id = data.id
    this.username = data.username
    this.passwordDigest = data.password_digest
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(SQL`SELECT * FROM users;`);
        let users = result.row.map(r => new User(r));
        res(users);
      } catch (err) {
        rej(`ERROR: Could not retrieve users - ${err}`);
      }
    })
  }

  static create({ username, password }) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(SQL`INSERT INTO USERS (username, password_digest) VALUES (${username}, ${password}) ON CONFLICT DO NOTHING RETURNING *;`)
        if(!result.rows[0]) throw new Error("Username Already Exists")
        let user = new User(result.rows[0]);
        res(user);
      } catch (err) {
        rej(`ERROR: Creating user - ${err.message}`);
      }
    })
  }

  static findByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(SQL`SELECT * FROM users WHERE username = ${username};`)
        let user = new User(result.rows[0]);
        res(user);
      } catch (err) {
        rej(`ERROR: Retrieving username - ${err}`)
      }
    });
  }
}

module.exports = User;