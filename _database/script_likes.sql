-- psql "dbname='dbhook' user='user_api' password='pwd_api' host='localhost'" -f ~/projetos/react-hooks/traversy/devconnector2/_database/script_likes.sql 

CREATE TABLE likes
(
  id serial NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  posts_id INTEGER REFERENCES posts(id),
  create_at TIMESTAMP DEFAULT Now()
)