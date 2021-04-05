const db = require('../db_config/init');
const SQL = require('sql-template-strings');

class User {
  constructor (data) {
    this.username = data.username
    this.passwordDigest = data.password_digest
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.run(SQL`SELECT * FROM users;`);
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
        let result = await db.run(SQL`INSERT INTO USERS (username, password_digest) VALUES (${username}, ${password}) RETURNING *;`)
        let user = new User(result.rows[0]);
        res(user);
      } catch (err) {
        rej(`ERROR: Creating user - ${err}`);
      }
    })
  }
}

module.exports = User;