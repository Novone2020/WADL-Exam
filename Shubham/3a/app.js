const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile('./public/home.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('./public/about.html', { root: __dirname });
});

app.get('/contact', (req, res) => {
  res.sendFile('./public/contact.html', { root: __dirname });
});

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
