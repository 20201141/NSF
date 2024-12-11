-- To connect with SSH in Ubuntu: 
-- 1. psql -h localhost -d nsf -U nsf -p 5432
-- 2. connect to db 'nsf' with "\c nsf" 
-- 3. after logging in as nsf (password: nsf5).
-- Notes:
-- up to 1GB for VARCHAR max limit
-- when inserting timestamp use built-in func CURRENT_TIMESTAMP

CREATE TABLE user_account (
  user_id SERIAL UNIQUE PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  email VARCHAR (256) UNIQUE NOT NULL,
  isDark BOOLEAN NOT NULL DEFAULT FALSE
); 

-- specifically created to work with connect-pg-simple
CREATE TABLE cookie (
  sid varchar NOT NULL COLLATE DEFAULT,
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE post (
  post_id SERIAL UNIQUE PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  title VARCHAR (50) NOT NULL, 
  date TIMESTAMP,   -- SET DEFAULT 'America/New_York' 
  post_type VARCHAR (11) NOT NULL, 
  content VARCHAR,  
  isresolved BOOLEAN NOT NULL DEFAULT FALSE,
  code VARCHAR,
  getnotif BOOLEAN NOT NULL DEFAULT FALSE,
  tags VARCHAR,
  CONSTRAINT fk_username
    FOREIGN KEY (username)
    REFERENCES user_account(username)
);

CREATE TABLE comment (
  comment_id SERIAL UNIQUE PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  post_id INTEGER NOT NULL,  -- 1...M (comment table)
  parent_id INTEGER DEFAULT NULL, -- threaded comments or replies will have value
  content VARCHAR, 
  date TIMESTAMP,
  likes INTEGER DEFAULT 0,
  CONSTRAINT fk_username
    FOREIGN KEY (username)
    REFERENCES user_account(username),
  CONSTRAINT fk_post_id
    FOREIGN KEY (post_id)
    REFERENCES post(post_id)
); 

CREATE TABLE likes (
  like_id SERIAL PRIMARY KEY,
  comment_id INTEGER NOT NULL,
  username VARCHAR(50) NOT NULL,
  CONSTRAINT fk_comment_id
    FOREIGN KEY (comment_id)
    REFERENCES comment(comment_id),
  CONSTRAINT fk_username
    FOREIGN KEY (username)
    REFERENCES user_account(username),
  UNIQUE (comment_id, username) -- makes sure a user can only like a comment once
);

