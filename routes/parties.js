const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query(
    'SELECT idname, dateStarted, dateEnded, location, idAuthor FROM news'
  );
  res.json(rows);
});

module.exports = router;
