import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Button, Popover, Avatar, List, Comment } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import moment from 'moment';

import PostImages from '../PostImages';
import CommentForm from '../CommentForm';
import PostCardContent from '../PostCardContent';
import FollowButton from '../FollowButton';
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
} from '../../reducers/post';

import * as S from './styles';

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);
  const { removePostLoading } = useSelector((state) => state.post);

  const datetime = post.createdAt;
  const fromNow = moment(datetime).fromNow();

  const postImages = post.Images[0] && post.Images;
  const retweetImages = post.RetweetFrom?.Images[0] && post.RetweetFrom.Images;
  const images = postImages || retweetImages;

  const isUser = !!id;

  const onRetweet = useCallback(() => {
    if (!isUser) {
      alert('로그인이 필요합니다.');
      return;
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  });
  const onLike = useCallback(() => {
    if (!isUser) return;
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const onUnlike = useCallback(() => {
    if (!isUser) return;
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const onRemovePost = useCallback(() => {
    if (!isUser) return;
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <S.CardWrapper>
      <Card
        cover={images && <PostImages images={images} />}
        actions={[
          (
            <S.IconWithCountWrapper>
              <RetweetOutlined key="retweet" onClick={onRetweet} title="리트윗" />
              <p>{post.RetweetTo?.length || 0}</p>
            </S.IconWithCountWrapper>
          ),
          (
            <S.IconWithCountWrapper>
              {
                liked
                  ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} title="좋아요 취소" />
                  : <HeartOutlined key="heart" onClick={onLike} title="좋아요" />
              }
              <p>{post.Likers.length}</p>
            </S.IconWithCountWrapper>
          ),
          (
            <S.IconWithCountWrapper>
              <MessageOutlined key="comment" onClick={onToggleComment} title="댓글" />
              <p>{post.Comments.length}</p>
            </S.IconWithCountWrapper>
          ),
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetFromId && post.RetweetFrom
          ? (
            <Link href={`/post/${post.id}`}>
              <a>
                <S.Time datetime={datetime}>{fromNow}</S.Time>
                <Card.Meta
                  avatar={(
                    <Link href={`/user/${post.RetweetFrom.User.id}`}>
                      <a><Avatar>{post.RetweetFrom.User.nickname[0]}</Avatar></a>
                    </Link>
                      )}
                  title={post.RetweetFrom.User.nickname}
                  description={(
                    <PostCardContent
                      postData={post.RetweetFrom.content}
                      retweetFrom={post.User.nickname}
                    />
                      )}
                />
              </a>
            </Link>
          ) : (
            <Link href={`/post/${post.id}`}>
              <a>
                <S.Time datetime={datetime}>{fromNow}</S.Time>
                <Card.Meta
                  avatar={(
                    <Link href={`/user/${post.User.id}`}>
                      <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                    </Link>
                      )}
                  title={post.User.nickname}
                  description={<PostCardContent postData={post.content} />}
                />
              </a>
            </Link>
          )}
      </Card>
      {commentFormOpened && (
      <div>
        <CommentForm post={post} />
        <List
          header={`${post.Comments.length}개의 댓글`}
          itemLayout="horizontal"
          dataSource={post.Comments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.User.nickname}
                avatar={(
                  <Link href={`/user/${item.User.id}`}>
                    <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                  </Link>
                  )}
                content={item.content}
              />
            </li>
          )}
        />
      </div>
      )}
    </S.CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetFromId: PropTypes.number,
    RetweetFrom: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
