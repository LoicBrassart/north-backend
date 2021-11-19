const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { backPort } = require('./conf');
const { auth, games, groups, parties, users, news, misc } = require('./routes');

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cors());

app.use('/auth', auth);
app.use('/games', games);
app.use('/groups', groups);
app.use('/news', news);
app.use('/parties', parties);
app.use('/users', users);
app.use('/', misc);

// 404 Error
app.use('/', (req, res) => {
  const msg = `Page not found: ${req.method} ${req.url}`;
  console.log(`404 - ${msg}`);
  res.status(404).send(msg);
});

app.listen(backPort, () => {
  console.log(
    `North Games API now available on http://localhost:${backPort} !`
  );
});
