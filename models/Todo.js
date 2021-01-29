const db = require('../db');
const ExpressError = require('../expressError');

class Todo {
	// Find all todos
	static async getTodos() {
		const result = await db.query(`SELECT * FROM todos`);

		return result.rows;
	}

	// Add a todo
	static async addTodo(data) {
		const result = await db.query(`INSERT INTO todos (description, completed) VALUES ($1, $2) RETURNING *`, [
			data.description,
			data.completed
		]);

		return result.rows[0];
	}

	static async updateTodo(data, id) {
		const result = await db.query(`UPDATE todos SET description = $1, completed = $2 WHERE id = $3 RETURNING *`, [
			data.description,
			data.completed,
			id
		]);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no item with id: ${id}`, 404);
		}

		return result.rows[0];
	}

	static async deleteTodo(id) {
		const result = await db.query(`DELETE FROM todos WHERE id = $1 RETURNING id`, [ id ]);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no item with id: ${id}`, 404);
		}

		return result.rows[0];
	}
}

module.exports = Todo;
