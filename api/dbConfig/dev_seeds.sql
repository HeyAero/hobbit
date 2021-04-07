DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password_digest VARCHAR(500) NOT NULL
)

DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  habit_desc VARCHAR(255),
  frequency VARCHAR(255),
  streak_track INT NOT NULL,
  streak_start VARCHAR(255) NOT NULL,
  streak_end VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)

INSERT INTO users(username, password_digest)
VALUES
  ('Aaron', 'tu9ibtoi4tbh2hhuet'),
  ('Ravil', 'h4hoeuba3r3tbaeu'),
  ('Faisal', 'ahudnthpdohbapbb243');