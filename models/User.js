const db = require('../db_config/init');
const SQL = require('sql-template-strings');

class User {
  constructor (data) {
    this.username = data.username
    this.passwordDigest = data.password_digest
    this.daily_streak = 0;
  }
}

module.exports = User;