const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({
        where: { email },
      });
  
      // 이메일 유무 검증
      if (!user) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' });
      }
  
      // 패스워드 유효성 검증
      const isVaildPassword = await bcrypt.compare(password, user.password);
      if (isVaildPassword) {
        return done(null, user);
      } else {
        return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
      }
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }));
};
