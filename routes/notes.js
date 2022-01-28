const notes = require('express').Router();
const {v4: uuidv4} = require ('uuid');
const {readFromFile, readAndAppend, writeTofile} = require("../helpers/fsUtils");

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const {id, title, text} = req.body;
    if (req.body) {
        const newNote = {
            id: uuidv4(),
            title,
            text,
        };

        readAndAppend(newNote, "./db/db.json");
        res.json("New note has been added successfully.");
    } else {
        res.error("Couldn't add new note.");
    };
});

notes.get('/:id', (req, res) => {
    const noteID = req.params.id;
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.delete('/:id', (req, res) => {
    const noteID = req.params.id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data)).then((json) => {
        const result = json.filter((note) => note.id !== noteID);
        writeTofile("'./db/db.json'", result);
        res.json(`${noteID} has been deleted`)
    })
})

module.exports = notes;