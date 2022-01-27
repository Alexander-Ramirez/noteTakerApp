const noteRoutes = require('express').Router();
const {v4: uuidv4} = require ("uuid");
const { readFromFile, readAndAppend, writeTofile } = require("../helpers/fsUtils");