const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../passport-strategies');
const { db, jwtRounds, jwtSecret } = require('../conf');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const formData = req.body;
    formData.password = bcrypt.hashSync(formData.password, jwtRounds);
    const [sqlRes] = await db.query(`INSERT INTO users SET ?`, formData);
    delete formData.password;
    formData.id = sqlRes.insertId;
    const token = jwt.sign(formData, jwtSecret);
    res.status(201).json({ user: formData, token });
  } catch (e) {
    console.log(`500 - ${e}`);
    res.status(500).json(e);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = jwt.sign(req.user, jwtSecret);
  res.status(200).json({ user: req.user, token });
});

module.exports = router;
