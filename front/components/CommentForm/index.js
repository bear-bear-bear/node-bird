import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import { ADD_COMMENT_REQUEST } from '../../reducers/post';

import * as S from './styles';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [commentText, setCommentText] = useState('');

  const onChangeCommentText = useCallback((e) => {
    const { value } = e.target;
    if (value.length > 140) return; // antd TextArea maxLength is not work

    setCommentText(value);
  }, []);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        userId: id,
        postId: post.id,
        content: commentText,
      },
    });
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <S.CustomButton type="primary" htmlType="submit" loading={addCommentLoading}>댓글달기</S.CustomButton>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
