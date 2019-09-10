-- psql "dbname='dbhook' user='user_api' password='pwd_api' host='localhost'" -f ~/projetos/react-hooks/traversy/devconnector2/_database/script_social.sql 
DROP TABLE social;
CREATE TABLE social
(
  id serial NOT NULL PRIMARY KEY,
  id_user INTEGER NOT NULL,
  twitter VARCHAR(100),
  facebook VARCHAR(100),
  linkedin VARCHAR(100),
  instagram VARCHAR(100),
  FOREIGN KEY (id_user) REFERENCES users (id)
);
