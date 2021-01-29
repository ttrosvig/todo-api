\c todo-app

DROP TABLE IF EXISTS todos;

CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  folder_name TEXT NOT NULL REFERENCES folders,
  description TEXT,
  completed TEXT
);