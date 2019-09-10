-- psql "dbname='dbhook' user='user_api' password='pwd_api' host='localhost'" -f ~/projetos/react-hooks/traversy/devconnector2/_database/script_comments.sql 

CREATE TABLE comments
(
  id serial NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  posts_id INTEGER REFERENCES posts(id),
  comment_text text NOT NULL,
  create_at TIMESTAMP DEFAULT Now()
)