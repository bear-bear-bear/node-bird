const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');

const router = express.Router();

// 로그인
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (serverError, user, clientError) => {
    if (serverError) {
      console.error(err);
      return next(err);
    }

    if (clientError) {
      return res.status(401).send(clientError.reason);
    }

    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [{
          model: Post,
        }, {
          model: User,
          as: 'Followings',
        }, {
          model: User,
          as: 'Followers',
        }]
      });
      return res.status(200).json(fullUserWithoutPassword);
    })
  })(req, res, next);
});

// 로그아웃
router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

// 회원가입
router.post('/', async (req, res, next) => { // POST /user/
  const { email, nickname, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });

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