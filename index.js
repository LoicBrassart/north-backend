const express = require('express');
const { backPort } = require('./conf');
const { users, games } = require('./routes');

const app = express();

app.get('/', async (req, res) => {
  res.send('Welcome aboard! ');
});

app.use('/users', users);
app.use('/games', games);

// 404 Error
app.use('/', (req, res) => {
  res.status(404).send(`Route not found: ${req.method} ${req.url} `);
});

app.listen(5050, () => {
  console.log(
    `North Games API now available on http://localhost:${backPort} !`
  );
});
