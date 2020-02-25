const express = require('express');
const path = require('path');

const app = express()
//const event = require('events')
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'static', 'main.html'));
})

app.get('/mode-2', (req,res) => {
  res.sendFile(path.join(__dirname, 'static', 'mode2 .html'));
})
app.listen(3000);