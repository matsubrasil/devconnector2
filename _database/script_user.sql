-- psql "dbname='apidb' user='postgres' password='admin' host='localhost'" -f ~/projetos/api_server/node-pg-api-v2/create_tables.sql
-- psql "dbname='apidb' user='user_mern' password='pwd_mern' host='localhost'" -f ~/projetos/api_server/node-pg-auth-v1/_database/create_table_users.sql


-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_mern;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_mern;
-- GRANT ALL PRIVILEGES ON DATABASE apidb TO user_mern;

-- psql "dbname='dbhook' user='user_api' password='pwd_api' host='localhost'" -f ~/projetos/react-hooks/traversy/devconnector2/_database/script_user.sql 
DROP TABLE users;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL,
  avatar varchar(100),
  create_at DATE default Now()
);

ALTER TABLE users ALTER COLUMN password TYPE
varchar
(100);