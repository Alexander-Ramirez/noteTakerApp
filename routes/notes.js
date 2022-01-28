const notes = require('express').Router();
const {v4: uuidv4} = require ("uuid");
const {readFromFile, readAndAppend, writeTofile} = require("../helpers/fsUtils");

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((notes) => res.json(JSON.parse(notes)));
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
        res.json("New notes has been added successfully.");
    } else {
        res.error("Couldn't add new notes.");
    };
});

notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json').then((notes) => JSON.parse(notes))
    .then((json) => { const result = json.filter((note) => note.id === noteId); });
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json').then((notes) => JSON.parse(notes)).then((json) => {
        const result = json.filter((notes) => notes.id !== noteId);
        writeTofile('./db/db.json', result);
        res.json(`${noteId} has been deleted`)
    })
})

module.exports = notes;