\c todo-app

DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL 
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  folder_id INTEGER NOT NULL REFERENCES folders,
  description TEXT,
  completed BOOLEAN
);