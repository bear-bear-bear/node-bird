module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // MySQL에선 comments 테이블 생성
    // id는 기본적으로 들어있다.
    content: {
      type: DataTypes.TEXT, // 길이 무제한
      allowNull: false, // 필수. true일시 선택
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글+이모티콘 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
