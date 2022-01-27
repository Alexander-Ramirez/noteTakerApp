const express = require('express');
const app = express();
const noteRouter = require('./noteRoutes');

app.use('/notes', noteRouter);

module.exports = app;