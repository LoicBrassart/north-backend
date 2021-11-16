const express = require('express');
const cors = require('cors');
const { backPort } = require('./conf');
const { games, groups, parties, users, news, misc } = require('./routes');

const app = express();
app.use(cors());

app.use('/games', games);
app.use('/groups', groups);
app.use('/news', news);
app.use('/parties', parties);
app.use('/users', users);
app.use('/', misc);

// 404 Error
app.use('/', (req, res) => {
  res.status(404).send(`Route not found: ${req.method} ${req.url} `);
});

app.listen(backPort, () => {
  console.log(
    `North Games API now available on http://localhost:${backPort} !`
  );
});
