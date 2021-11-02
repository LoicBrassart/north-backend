const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT id, pseudo, avatar FROM users');
  res.json(rows);
});

module.exports = router;
