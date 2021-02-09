const db = require('../db');
const ExpressError = require('../expressError');

class Todo {
	// Find todos by folder id
	static async getTodoByFolder(folder_id) {
		const result = await db.query(`SELECT * FROM todos WHERE folder_id = $1`, [ folder_id ]);

		return result.rows;
	}

	// Add a todo
	static async addTodo(data) {
		const result = await db.query(
			`INSERT INTO todos (description, completed, folder_id) VALUES ($1, $2, $3) RETURNING *`,
			[ data.description, data.completed, data.folder_id ]
		);

		return result.rows[0];
	}

	static async updateTodo(data, id) {
		const result = await db.query(
			`UPDATE todos SET description = $1, completed = $2, folder_id = $3 WHERE id = $4 RETURNING *`,
			[ data.description, data.completed, data.folder_id, id ]
		);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no item with id: ${id}`, 404);
		}

		return result.rows[0];
	}

	static async deleteTodo(id) {
		const result = await db.query(`DELETE FROM todos WHERE id = $1 RETURNING id`, [ id ]);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no todo with id: ${id}`, 404);
		}

		return result.rows[0];
	}
}

module.exports = Todo;
