const express = require('express');
const path = require('path');

const app = express()
//const event = require('events')
app.use(express.static(path.join(__dirname, 'static')))

app.get('/mode-1', (req,res) => {
  res.sendFile(path.join(__dirname, 'static', 'mode-1.html'));
})

app.get('/mode-2', (req,res) => {
  res.sendFile(path.join(__dirname, 'static', 'mode.2 .html'));
})
app.listen(3000);