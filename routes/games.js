const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM games');
  res.json(rows);
});

module.exports = router;
