const express = require('express');
const router = express.Router();
const ExpressError = require('../expressError');
const Folder = require('../models/Folder');
const { validate } = require('jsonschema');
const folderSchema = require('../schemas/folderSchema.json');

// Get all folders
router.get('/', async (req, res, next) => {
	try {
		const folders = await Folder.getFolders();

		return res.json({ folders });
	} catch (err) {
		return next(err);
	}
});

// Add a folder
router.post('/', async (req, res, next) => {
	try {
		const validation = validate(req.body, folderSchema);
		if (!validation.valid) {
			throw new ExpressError(validation.errors.map((e) => e.stack), 400);
		}

		const folder = await Folder.addFolder(req.body);

		return res.status(201).json({ folder });
	} catch (err) {
		return next(err);
	}
});

// Delete a folder
router.delete('/:id', async (req, res, next) => {
	try {
		await Folder.deleteFolder(req.params.id);

		return res.status(202).json({ status: 'Folder successfully deleted' });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
