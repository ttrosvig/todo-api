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
		const result = await db.query(
			`INSERT INTO todos (description, completed, folder_name) VALUES ($1, $2, $3) RETURNING *`,
			[ data.description, data.completed, data.folder_name ]
		);

		return result.rows[0];
	}

	static async updateTodo(data, id) {
		const result = await db.query(
			`UPDATE todos SET description = $1, completed = $2, folder_name = $3 WHERE id = $4 RETURNING *`,
			[ data.description, data.completed, data.folder_name, id ]
		);

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
