-- psql "dbname='dbhook' user='user_api' password='pwd_api' host='localhost'" -f ~/projetos/react-hooks/traversy/devconnector2/_database/script_experience.sql 

DROP TABLE experience;


CREATE TABLE experience
(
  id serial NOT NULL PRIMARY KEY,
  id_profile INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  current BOOLEAN DEFAULT FALSE,
  description text,
  date_from DATE NOT NULL,
  date_to DATE,
  FOREIGN KEY
  (id_profile) REFERENCES profile
  (id)
);