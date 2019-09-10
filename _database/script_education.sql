-- psql "dbname='dbhook' user='user_api' password='pwd_api' host='localhost'" -f ~/projetos/react-hooks/traversy/devconnector2/_database/script_education.sql 
DROP TABLE education;
CREATE TABLE education
(
  id serial NOT NULL PRIMARY KEY,
  id_user INTEGER NOT NULL,
  school VARCHAR(100) NOT NULL,
  degree VARCHAR(100) NOT NULL,
  fieldofstudy VARCHAR(100) NOT NULL,
  date_from DATE NOT NULL,
  date_to DATE,
  currenty BOOLEAN DEFAULT FALSE,
  description text,
  FOREIGN KEY (id_user) REFERENCES users (id)
);