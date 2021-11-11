const express = require('express')
const PORT = 3001
const data = require('./db/db.json')
const app = express()
const fs = require('fs')
const path = require('path')
const api = require('./public/assets/js/index')

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
)


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀 `)
)

//GET middleware

// Routes
    //home route sends index.html file
    //notes route sends notes.html -- each one should have its own ID --download a package for this (UUID)
//API routes
// GET api notes -- read bd.json
    // --parse data into JSON
    //send to front end
// POST api notes



