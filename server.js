const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


const app = express();
let PORT = process.env.PORT || 3001;
const mainDir = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/notes', (req, res) => {
    res.sendFile(mainDir, "/notes.html")
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

app.get("*", (req, res) => {
    res.sendFile(mainDir, "/index.html")
})

app.get("/api/notes:id", (req, res) => {
    const createdNotes = fs.readFileSync('./db/db.json', 'utf8')
    res.json(createdNotes[Number(req.params.id)])
});

let i = 0;
app.post('/api/notes', (req, res) => {
    const createdNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    const newNote = req.body;
    let noteId = (uuid.v1());
    newNote.id = noteId
    createdNotes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(createdNotes));
    console.log("note Saved", newNote);
    res.json(createdNotes);
});

app.delete("/api/notes/:id", (req, res) => {
    const notes = fs.readFileSync('./db/db.json', 'utf8');
    const data = JSON.parse(notes);
    let deleteId = data.map(function (item) {return item.id}).indexOf(req.params.id);
    data.splice(deleteId, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.json(true)
})


    // console.log(`request received for delete at /api/notes/${req.params.id}`)
    // const notes = fs.readFileSync('./db/db.json','utf8')
    // const data=JSON.parse(notes)
    // data.splice(req.params.id, 1)
    // console.log( JSON.stringify(data) );
    // res.status(200);
    // res.json(notes[Number(req.params.id)])
    // fs.writeFileSync('./db/db.json',JSON.stringify(data))



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);


