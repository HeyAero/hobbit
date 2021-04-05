const db = require('../db_config/init');
const SQL = require('sql-template-strings');

class User {
  constructor (data) {
    this.username = data.username
    this.passwordDigest = data.password_digest
    this.daily_streak = 0;
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
}

module.exports = User;