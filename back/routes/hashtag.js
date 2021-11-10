const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Post, Hashtag, Image, Comment, User } = require('../models');

// 작성한 게시글 목록
router.get('/:hashtag', async (req, res, next) => { // GET /hashtag/:hashtag
  try {
    const lastId = parseInt(req.query.lastId, 10);
    const where = {};
    if (lastId) { // 초기 로딩이 아닐때
      where.id = { [Op.lt ]: lastId }
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.hashtag) },
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: Comment,
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: Image,
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'RetweetFrom',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }],
      }],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
