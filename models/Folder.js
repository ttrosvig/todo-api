const db = require('../db');
const ExpressError = require('../expressError');

class Folder {
	static async getFolders() {
		const result = await db.query(`SELECT * FROM folders`);

		return result.rows;
	}

	static async addFolder(data) {
		const result = await db.query(`INSERT INTO folders (name) VALUES($1) RETURNING *`, [ data.name ]);

		return result.rows[0];
	}

	static async deleteFolder(id) {
		const result = await db.query(`DELETE FROM folders WHERE id = $1 RETURNING id`, [ id ]);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no folder with id: ${id}`, 404);
		}

		return result.rows[0];
	}
}

module.exports = Folder;
