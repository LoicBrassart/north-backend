const express = require('express');
const cors = require('cors');
const { backPort } = require('./conf');
const { users, games, misc } = require('./routes');

const app = express();
app.use(cors());

app.use('/users', users);
app.use('/games', games);
app.use('/', misc);

// 404 Error
app.use('/', (req, res) => {
  res.status(404).send(`Route not found: ${req.method} ${req.url} `);
});

app.listen(5050, () => {
  console.log(
    `North Games API now available on http://localhost:${backPort} !`
  );
});
