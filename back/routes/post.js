const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Image, Comment, User } = require('../models');
const { isLoggedIn } = require('../routes/middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('uploads 디렉터리가 없으므로 새로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) { // abcd.png
      const ext = path.extname(file.originalname); // png
      const basename = path.basename(file.originalname, ext) // abcd
      done(null, basename + '_' + new Date().getTime() + ext); // abcd209901011234.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// 이미지 업로드
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  res.json(req.files.map((v) => v.filename));
});

// 게시글 작성
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /post
  try {
    const { image: imagePath, content } = req.body;
    const { id: UserId } = req.user;
    const post = await Post.create({ content, UserId });
    console.log('imagePath', imagePath);
    console.log('content', content);
    console.log('UserId', UserId);

    if (imagePath) {
      if (Array.isArray(imagePath)) { // 이미지를 여러 개 올리면 imagePath: [a.png, b.png]
        const images = await Promise.all(imagePath.map((path) => Image.create({ src: path })));
        await post.addImages(images);
      } else { // 이미지를 한개만 올리면 image: a.png
        const image = await Image.create({ src: imagePath });
        await post.addImages(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 게시글 좋아요 on
router.patch('/:postId/like', isLoggedIn, async(req, res, next) => { // PATCH /post/:postId/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});

    // 게시글 유무 검사
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }

    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 게시글 좋아요 off
router.delete('/:postId/like', isLoggedIn, async(req, res, next) => { // DELETE /post/:postId/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});

    // 게시글 유무 검사
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }

    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 게시글 삭제
router.delete('/:postId', isLoggedIn, async(req, res, next) => { // DELETE /post/:postId
  try {
    const { postId } = req.params;
    await Post.destroy({
      where: {
        id: postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(postId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 댓글 작성
router.post('/:postId/comment', isLoggedIn, async (req, res) => { //  POST /post/:postId/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });
    res.status(201).json(fullComment);
  } catch (err) {
    console.error(err);
    next(error);
  }
})

module.exports = router;
