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
router.get('/', async (req, res, next) => { // GET /user
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

// 특정 유저 확인
router.get('/:userId', async (req, res, next) => { // GET /user/:userId
  try {
    const user = { id: req.params.userId };
    const fullUserWithoutPassword = await getFullUserWithoutPassword(user);
    
    if (fullUserWithoutPassword) {
      // 보안을 위해 다른 사람 정보 불러올 땐 개인 정보를 제외
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  console.log('🚚🚚🚚', req.headers);
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

// 닉네임 수정
router.post('/nickname', isLoggedIn, async (req, res, next) => { // POST /user/
  try {
    const { nickname } = req.body;
    const { id } = req.user;
    await User.update({ nickname }, { where: { id }});
    res.status(200).json({ nickname });
  } catch (err) {
    console.error(err);
    next(error);
  }
});

// 팔로우
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/:userId/follow
  try {
    const { userId: targetId } = req.params;
    const { id: myId } = req.user;
    const target = await User.findOne({ where: { id: targetId }});

    if (!target) {
      res.status(403).send('없는 사람을 팔로우하려 시도했습니다.');
    }
    await target.addFollowers(myId);
    res.status(200).json({ UserId: parseInt(targetId, 10) });
  } catch (err) {
    console.error(err);
    next(error);
  }
});

// 팔로우 취소
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/:userId/follow
  try {
    const { userId: targetId } = req.params;
    const { id: myId } = req.user;
    const target = await User.findOne({ where: { id: targetId }});

    if (!target) {
      res.status(403).send('없는 사람을 팔로우 취소하려 시도했습니다.');
    }
    await target.removeFollowers(myId);
    res.status(200).json({ UserId: parseInt(targetId, 10) });
  } catch (err) {
    console.error(err);
    next(error);
  }
});

// 팔로워 삭제
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { // DELETE /user/follower/:userId
  try {
    const { userId: targetId } = req.params;
    const { id: myId } = req.user;
    const target = await User.findOne({ where: { id: targetId }});

    if (!target) {
      res.status(403).send('없는 사람을 팔로워 삭제하려 시도했습니다.');
    }
    await target.removeFollowings(myId);
    res.status(200).json({ UserId: parseInt(targetId, 10) });
  } catch (err) {
    console.error(err);
    next(error);
  }
});

// 팔로워 목록
router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
  try {
    const { id: myId } = req.user;
    const user = await User.findOne({ where: { id: myId }});
    if (!user) {
      res.status(403).send('사용자가 존재하지 않습니다.');
    }
    const followers = await user.getFollowers(); 
    res.status(200).json(followers);
  } catch (err) {
    console.error(err);
    next(error);
  }
});

// 팔로잉 목록
router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
  try {
    const { id: myId } = req.user;
    const user = await User.findOne({ where: { id: myId }});
    if (!user) {
      res.status(403).send('사용자가 존재하지 않습니다.');
    }
    const followings = await user.getFollowings(); 
    res.status(200).json(followings);
  } catch (err) {
    console.error(err);
    next(error);
  }
});

module.exports = router;