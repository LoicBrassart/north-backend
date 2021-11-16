const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/search', async (req, res) => {
  const { needle } = req.query;
  const [rows] = await db.query(
    'SELECT type, id, name, thumb FROM searchable WHERE name LIKE ?',
    `%${needle}%`
  );
  const results = {
    users: [],
    characters: [],
    articles: [],
    games: [],
    scenarii: [],
    others: [],
  };
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (results[row.type]) {
      results[row.type].push(row);
    } else {
      results.others.push(row);
    }
  }
  res.json(results);
});

module.exports = router;
