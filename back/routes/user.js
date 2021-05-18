const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('../routes/middlewares');

const router = express.Router();

const getFullUserWithoutPassword = async (user) => {
  const fullUserWithoutPassword = await User.findOne({
    where: { id: user.id },
    attributes: {
      exclude: ['password'],
    },
    include: [{
      model: Post,
      attributes: ['id'],
    }, {
      model: User,
      as: 'Followings',
      attributes: ['id'],
    }, {
      model: User,
      as: 'Followers',
      attributes: ['id'],
    }]
  });
  return fullUserWithoutPassword;
}

// 유저 확인
router.get('/', isLoggedIn, async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await getFullUserWithoutPassword(req.user);
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
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
      const fullUserWithoutPassword = await getFullUserWithoutPassword(user);
      return res.status(200).json(fullUserWithoutPassword);
    })
  })(req, res, next);
});

// 로그아웃
router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

// 회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
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