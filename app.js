const express = require('express');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const todoRoutes = require('./routes/todos');
const folderRoutes = require('./routes/folders');

// Use the routes
app.use('/todos', todoRoutes);
app.use('/folders', folderRoutes);

// 404 handler
app.use(function(req, res, next) {
	const err = new ExpressError('Not Found');
	err.status = 404;

	// Pass the error to next middleware
	return next(err);
});

// General error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);

	return res.json({
		error: err
	});
});

module.exports = app;
