-- psql "dbname='dbhook' user='user_api' password='pwd_api' host='localhost'" -f ~/projetos/react-hooks/traversy/devconnector2/_database/script_profile.sql 

CREATE TABLE profile
(
  id serial NOT NULL PRIMARY KEY,
  id_user INTEGER,
  company VARCHAR(100),
  website VARCHAR(100),
  location VARCHAR(100),
  status VARCHAR(50) NOT NULL,
  skills text NOT NULL,
  bio text,
  githubusername VARCHAR(300),
  FOREIGN KEY (id_user) REFERENCES users (id)
);



INSERT INTO profile
  (
  id_user
  , company
  , website
  , location
  , status
  , skills
  , bio
  , githubusername)
VALUES(
    5
  , 'Star inc.'
  , 'http://www.star.com'
  , 'Merryll 4300 SA'
  , 'Senior'
  , 'html, c, asp'
  , 'Bla blas nmsasa'
  , 'matsub'
);