// Change node environment to testing
process.env.NODE_ENV === 'test';

const request = require('supertest');
const db = require('../db');
const app = require('../app');

// Create a folder and todo before each test
beforeEach(async () => {
	await db.query(`INSERT INTO folders (name) VALUES('Test Folder');`);

	await db.query(`INSERT INTO todos (description, folder_id, completed) VALUES('Test Todo', 1, false);`);
});

// Reset tables after each test
afterEach(async () => {
	await db.query(`DROP TABLE IF EXISTS todos;
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
  );`);
});

describe('GET /todos/folders', () => {
	it('should return the seeded todo inside of the folder', async () => {
		let res = await request(app).get('/todos/folders/1');

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ todos: [ { id: 1, description: 'Test Todo', folder_id: 1, completed: false } ] });
	});
});

describe('POST /todos', () => {
	it('should return the posted todo', async () => {
		let res = await request(app).post('/todos').send({
			description: 'Test Todo 2',
			folder_id: 1,
			completed: false
		});

		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({ todo: { id: 2, description: 'Test Todo 2', folder_id: 1, completed: false } });

		// Expect both todos to show up in the first folder
		let getRes = await request(app).get('/todos/folders/1');

		expect(getRes.statusCode).toBe(200);
		expect(getRes.body).toEqual({
			todos: [
				{ id: 1, description: 'Test Todo', folder_id: 1, completed: false },
				{ id: 2, description: 'Test Todo 2', folder_id: 1, completed: false }
			]
		});
	});
});

describe('PUT /todos/:id', () => {
	it('should return the edited todo', async () => {
		let res = await request(app).put('/todos/1').send({ description: 'Edited Todo', completed: true, folder_id: 1 });

		expect(res.statusCode).toBe(202);
		expect(res.body).toEqual({ todo: { id: 1, description: 'Edited Todo', completed: true, folder_id: 1 } });
	});
});

describe('DELETE /todos/:id', () => {
	it('should return a status message saying the todo was successfully deleted', async () => {
		let res = await request(app).delete('/todos/1');

		expect(res.statusCode).toBe(202);
		expect(res.body).toEqual({ status: 'Item successfully deleted' });
	});
});
