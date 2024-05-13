const express = require('express');
const fs = require('fs');
const path = require('path');
const id = require('./Utils/id.js')
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));

app.use(express.json());

//CRUD routes
app.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, './public/notes.html'));
console.log('Moved to notes.html');
});



app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
       return res.json(JSON.parse(data));
    });
  });

app.post('/api/notes', (req, res) => {
    //Read db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        //parse into an array
        const notesArray = JSON.parse(data);
        
     //add new note to that array
     notesArray.push({
        id:id(),
        ...req.body 
     })
     console.log(req.body)
    //write it back into the file
        fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err) => {
            if (err) {
                console.error(err)
                return
            } 
            console.log('New Note Added!')
        });
         res.status(204).end()
         return
    });
    
   
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
// app.get('/api/notes', (req, res) => {
  
// });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

  
  
