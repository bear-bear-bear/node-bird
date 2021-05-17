const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => { // POST /user/
  const { email, nickname, password } = req.body;
  try {
    const exUser = await User.findOne({
      where: {
        email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디 입니다.');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (err) {
    console.error(err);
    next(error); // status 500
  }
});

module.exports = router;