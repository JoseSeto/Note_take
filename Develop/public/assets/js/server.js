const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//API routes
app.get('/api/notes', (req,res) => {
  fs.readFile(path.join (__dirname, '/db/db.json'), 'utf-8',
  (err, data) =>{
    if (err){
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes'})
    }
    res.json(JSON.parse(data))
  })
})

// HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
  
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });