-- psql "dbname='dbhook' user='user_api' password='pwd_api' host='localhost'" -f ~/projetos/react-hooks/traversy/devconnector2/_database/script_posts.sql 
-- DROP TABLE posts;

CREATE TABLE posts
(
  id serial NOT NULL PRIMARY KEY,
  id_user INTEGER,
  post_title text NOT NULL,
  post_text text NOT NULL,
  create_at TIMESTAMP DEFAULT Now(),

  FOREIGN KEY (id_user) REFERENCES users (id)
);