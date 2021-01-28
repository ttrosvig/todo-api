const express = require('express');
const ExpressError = require('../expressError');
const router = express.Router();
const Todo = require('../models/Todo');
const { validate } = require('jsonschema');
const todoSchema = require('../schemas/todoSchema.json');

// Get todos
router.get('/', async (req, res, next) => {
	try {
		const todos = await Todo.getTodos();

		return res.json({ todos });
	} catch (err) {
		return next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const validation = validate(req.body, todoSchema);
		if (!validation.valid) {
			throw new ExpressError(validation.errors.map((e) => e.stack), 400);
		}

		const todo = await Todo.addTodo(req.body);

		return res.json({ todo });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
