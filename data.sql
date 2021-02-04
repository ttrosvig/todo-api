-- Or todo-app-test for test database

-- \c todo-app

DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL 
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  folder_id INTEGER NOT NULL REFERENCES folders ON DELETE CASCADE,
  description TEXT,
  completed BOOLEAN
);