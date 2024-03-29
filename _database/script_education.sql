-- psql "dbname='dbhook' user='user_api' password='pwd_api' host='localhost'" -f ~/projetos/react-hooks/traversy/devconnector2/_database/script_education.sql 
DROP TABLE education;

CREATE TABLE education
(
  id serial NOT NULL PRIMARY KEY,
  id_profile INTEGER NOT NULL REFERENCES profile(id),
  school VARCHAR(100) NOT NULL,
  degree VARCHAR(100) NOT NULL,
  fieldofstudy VARCHAR(100) NOT NULL,
  date_from DATE NOT NULL,
  date_to DATE,
  current BOOLEAN DEFAULT FALSE,
  description text
);