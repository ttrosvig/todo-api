// Change node environment to testing
process.env.NODE_ENV === 'test';

const request = require('supertest');
const db = require('../db');
const app = require('../app');

// Create a folder before each test
beforeEach(async () => {
	await db.query(`INSERT INTO folders (name) VALUES('Test Folder');`);
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

describe('GET /folders', () => {
	it('should return the seeded value', async () => {
		const res = await request(app).get('/folders');

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ folders: [ { id: 1, name: 'Test Folder' } ] });
	});
});

describe('POST /folders', () => {
	it('should return the created folder', async () => {
		const res = await request(app).post('/folders').send({ name: 'Test Folder 2' });

		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({ folder: { id: 2, name: 'Test Folder 2' } });
	});
});

describe('DELETE /folders/:id', () => {
	it('should return a message saying the folder was successfully deleted', async () => {
		const res = await request(app).delete('/folders/1');

		expect(res.statusCode).toBe(202);
		expect(res.body).toEqual({ status: 'Folder successfully deleted' });

		const getRes = await request(app).get('/folders');

		expect(getRes.body).toEqual({ folders: [] });
	});
});
