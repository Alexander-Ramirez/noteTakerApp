const express = require('express');
const app = express();
const noteRoutes = require('./noteRoutes');

app.use('/notes', noteRoutes);

module.exports = app;