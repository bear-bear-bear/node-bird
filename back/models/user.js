module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // MySQL에선 users 테이블 생성
    // id는 기본적으로 들어있다.
    email: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수. true일시 선택
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수. true일시 선택
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 필수. true일시 선택
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
  });
  User.associate = (db) => {
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
  };
  return User;
};
