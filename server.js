const http = require('http');
const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000
const con = mysql.createPool({
  connectionLimit : 10,
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'b6fb6ff52fae88',
  password: 'fe2addba',
  database: 'heroku_00f1d560fd3e9c7'
});

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/css', express.static(__dirname + 'public/js'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/views/admin.html')
})

app.get('/reader', (req, res) => {
  res.sendFile(__dirname + '/views/reader.html')
})

app.get('/admin-count',(req,res) =>{
  con.query('SELECT COUNT(*) as count FROM quotes', function(error,results,fields){
    if(error) throw error;
    
    count = results[0].count
    res.write("" + count);
    res.end();
  })
})

app.get('/admin-data',(req,res) =>{
  con.query('Select * from quotes', function(error,results,fields){
    if(error) throw error;
    res.json(results)
    
  })
})

app.get('/reader', (req, res) => {
  res.sendFile(__dirname + '/views/reader.html')
})


app.delete('/delete-question', (req,res) =>{
    con.query('DELETE from quotes where id = '+ req.body.id, function(error,results,fields){
      if(error) throw error;
      res.send(req.body.id)
    })
    
})

app.post('/add-question', (req,res) => {
  con.query('INSERT INTO quotes (quote,author) VALUES ("","")', function(error,results,fields){
    if(error) throw error;
    con.query('SELECT id FROM quotes ORDER BY id DESC LIMIT 1', function(error,results,fields){
      if(error) throw error;
      res.json(results)
    })
  })
})

app.put('/update-question', (req,res) => {
    con.query('UPDATE quotes SET quote ="'+req.body.quote+'",author="'+req.body.author+
    '" WHERE id='+req.body.id, function(error,results,fields){
      if(error) throw error;
    })
})

app.post('/update-question-post', (req,res) => {
  con.query('INSERT INTO quotes (quote,author) VALUES ("'+req.body.quote+'","'+req.body.author+'")', function(error,results,fields){
    if(error) throw error;
    con.query('SELECT * FROM quotes ORDER BY id DESC LIMIT 1', function(error,results,fields){
      if(error) throw error;
      res.json(results)
    })
  })
})

app.get('/API/v1/quotes/1', (req,res) => {
  con.query('SELECT * FROM quotes ORDER BY id DESC LIMIT 1', function(error,results,fields){
    if(error) throw error;
    res.json(results)
  })
})

app.listen(port, () => console.info('Listening on port ' + port))

