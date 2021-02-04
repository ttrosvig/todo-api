require('dotenv').config();

const PORT = process.env.PORT || 3001;

const DB_URI = process.env.NODE_EV === 'test' ? 'todo-app-test' : process.env.DATABASE_URL || 'todo-app';

process.env.DATABASE_URL || 'todo-app';

module.exports = { PORT, DB_URI };
