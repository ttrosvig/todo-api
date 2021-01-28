const db = require('../db');

class Todo {
	// Find all todos
	static async getTodos() {
		const result = await db.query(`SELECT * FROM todos`);

		return result.rows;
	}

	// Add a todo
	static async addTodo(data) {
		const result = await db.query(`INSERT INTO todos (description, completed) VALUES ($1, $2)`, [
			data.description,
			data.completed
		]);

		return result.rows[0];
	}
}

module.exports = Todo;
