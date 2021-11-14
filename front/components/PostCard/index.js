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
  const isRetweeted = post.RetweetFromId && post.RetweetFrom;

  const onRetweet = useCallback(() => {
    if (!isUser) {
      alert('로그인이 필요합니다.');
      return;
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [isUser]);
  const onLike = useCallback(() => {
    if (!isUser) return;
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [isUser]);
  const onUnlike = useCallback(() => {
    if (!isUser) return;
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [isUser]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const onRemovePost = useCallback(() => {
    if (!isUser) return;
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [isUser]);

  return (
    <S.CardWrapper isRetweeted={!!post.RetweetFrom}>
      {post.RetweetFrom && (
        <S.RetweetText>
          <span><RetweetOutlined /></span>
          <span><b>{post.User.nickname} 님이 리트윗함</b></span>
        </S.RetweetText>
      )}
      <Card
        bordered={false}
        cover={images && <PostImages images={images} />}
        actions={[
          (
            <S.IconWithCountWrapper onClick={onRetweet}>
              <RetweetOutlined key="retweet" title="리트윗" />
              <p>{post.RetweetTo?.length || 0}</p>
            </S.IconWithCountWrapper>
          ),
          (
            <S.IconWithCountWrapper onClick={liked ? onUnlike : onLike}>
              {
                liked
                  ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" title="좋아요 취소" />
                  : <HeartOutlined key="heart" title="좋아요" />
              }
              <p>{post.Likers.length}</p>
            </S.IconWithCountWrapper>
          ),
          (
            <S.IconWithCountWrapper onClick={onToggleComment}>
              <MessageOutlined key="comment" title="댓글" />
              <p>{post.Comments.length}</p>
            </S.IconWithCountWrapper>
          ),
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    {!isRetweeted && (
                      <Button
                        type="primary"
                        // onClick={onEditPost}
                      >
                        수정
                      </Button>
                    )}
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <>
                    <FollowButton post={post} />
                    <Button type="danger">신고</Button>
                  </>
                )}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        {isRetweeted
          ? (
            <>
              <S.Time datetime={datetime}>{fromNow}</S.Time>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.RetweetFrom.User.id}`} prefetch={false}>
                    <a><Avatar>{post.RetweetFrom.User.nickname[0]}</Avatar></a>
                  </Link>
                      )}
                title={post.RetweetFrom.User.nickname}
                description={(<PostCardContent postData={post.RetweetFrom.content} />)}
              />
            </>
          ) : (
            <>
              <S.Time datetime={datetime}>{fromNow}</S.Time>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.User.id}`} prefetch={false}>
                    <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                  </Link>
                      )}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
              />
            </>
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
                  <Link href={`/user/${item.User.id}`} prefetch={false}>
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
