const express = require('express');
const ExpressError = require('../expressError');
const router = express.Router();
const Todo = require('../models/Todo');
const { validate } = require('jsonschema');
const todoSchema = require('../schemas/todoSchema.json');

// Get todos by folder
router.get('/folders/:folder_id', async (req, res, next) => {
	try {
		const todos = await Todo.getTodoByFolder(req.params.folder_id);

		return res.json({ todos });
	} catch (err) {
		return next(err);
	}
});

// Add a todo
router.post('/', async (req, res, next) => {
	try {
		const validation = validate(req.body, todoSchema);
		if (!validation.valid) {
			throw new ExpressError(validation.errors.map((e) => e.stack), 400);
		}

		const todo = await Todo.addTodo(req.body);

		return res.status(201).json({ todo });
	} catch (err) {
		return next(err);
	}
});

// Update a todo
router.put('/:id', async (req, res, next) => {
	try {
		if ('id' in req.body) {
			throw new ExpressError('Not allowed', 400);
		}

		const validation = validate(req.body, todoSchema);
		if (!validation.valid) {
			throw new ExpressError(validation.errors.map((e) => e.stack), 400);
		}

		const todo = await Todo.updateTodo(req.body, req.params.id);

		return res.status(202).json({ todo });
	} catch (err) {
		return next(err);
	}
});

// Delete a todo
router.delete('/:id', async (req, res, next) => {
	try {
		await Todo.deleteTodo(req.params.id);

		return res.status(202).json({ status: `Item successfully deleted` });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
