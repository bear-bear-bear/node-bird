module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // MySQL에선 posts 테이블 생성
    // id는 기본적으로 들어있다.
    content: {
      type: DataTypes.TEXT, // 길이 무제한
      allowNull: false, // 필수. true일시 선택
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글+이모티콘 저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.Post, { as: 'RetweetFrom' });
    db.Post.hasMany(db.Post, { as: 'RetweetTo' });
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
  };
  return Post;
};
