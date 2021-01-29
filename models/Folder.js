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
}

module.exports = Folder;
