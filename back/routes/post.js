const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('../routes/middlewares');

const router = express.Router();

// 이미지 업로드
if (process.env.NODE_ENV === 'production') {
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });

  const upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'bearsns',
      key(req, file, cb) {
        cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
      }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  });

  router.post('/images', upload.array('image'), (req, res, next) => { // POST /post/images
    res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/')));
  });
} else {
  try {
    fs.accessSync('uploads');
  } catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
  }

  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads');
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        done(null, basename + '_' + new Date().getTime() + ext);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  });

  router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
  });
}

// 게시글 하나 가져오기
router.get('/:postId', async (req, res, next) => { // GET /post/:postId
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    // 게시물 유무 검증
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글 입니다.');
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Post,
        as: 'RetweetFrom',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }],
      }, {
        model: Post,
        as: 'RetweetTo',
        attributes: ['id'],
      }, {
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
        attributes: ['id', 'nickname'],
      }],
    });

    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(error);
  }
});

// 게시글 작성
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /post
  try {
    const { image: imagePath, content } = req.body;
    const { id: UserId } = req.user;
    const hashtags = content.match(/#[^\s#]+/g);
    const post = await Post.create({ content, UserId });

    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where:  { name: tag.slice(1).toLowerCase() },
      })));
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (imagePath) {
      if (Array.isArray(imagePath)) { // 이미지를 여러 개 올리면 imagePath: [a.png, b.png]
        const images = await Promise.all(imagePath.map((imagePath) => Image.create({
          src: imagePath,
        })));
        await post.addImages(images);
      } else { // 이미지를 한개만 올리면 image: a.png
        const image = await Image.create({
          src: imagePath,
        });
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

// 게시글 수정
router.patch('/:postId', isLoggedIn, async(req, res, next) => { // PATCH /post/:postId
  const hashtags = req.body.content.match(/#[^\s#]+/g);

  try {
    await Post.update({
      content: req.body.content
    }, {
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });

    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where:  { name: tag.slice(1).toLowerCase() },
      })));
      await post.setHashtags(result.map((v) => v[0]));
    }

    res.status(200).json({
      PostId: parseInt(req.params.postId, 10),
      content: req.body.content,
    });
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
    const post = await Post.findOne({
      where: {
        id: postId,
        UserId: req.user.id,
      },
    });
    await post.destroy();

    res.status(200).json(post);
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

// 게시글공유
router.post('/:postId/retweet', isLoggedIn, async (req, res) => { //  POST /post/:postId/retweet
  try {
    const { id: UserId } = req.user;
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Post,
        as: 'RetweetFrom',
      }],
    });

    // 게시물 유무 검증
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }

    // 셀프 게시글공유 검증
    const isRetweetOwnPost = UserId === post.UserId;
    const isRetweetOwnPostThatRetweeted = UserId === post.Retweet?.UserId;
    if(isRetweetOwnPost || isRetweetOwnPostThatRetweeted) {
      return res.status(403).send('자신의 글은 공유할 수 없습니다.');
    }

    // 자신이 이미 게시글공유했던 게시물인지 검증
    const retweetFromId = post.Retweet?.id || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId,
        RetweetFromId: retweetFromId,
      }
    });
    if (exPost) {
      return res.status(403).send('이미 공유한 글입니다');
    }

    const retweet = await Post.create({
      UserId,
      RetweetFromId: retweetFromId,
      content: 'retweet',
    });

    const retweetedPost = await retweet.getRetweetFrom();
    const prevRetweetTo = (await retweetedPost.getRetweetTo()) || [];
    await retweetedPost.setRetweetTo([...prevRetweetTo, retweet]);

    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: Post,
        as: 'RetweetFrom',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }],
      },{
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

    res.status(201).json(retweetWithPrevPost);
  } catch (err) {
    console.error(err);
    next(error);
  }
});

module.exports = router;
