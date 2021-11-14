import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData, isEditting, requestEdit, cancleEdit }) => {
  const [editText, setEditText] = useState(postData);
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const hashtagRegex = /(#[^\s#]+)/g;

  const onChangeEditText = useCallback((e) => {
    const { value } = e.target;
    if (value.length > 140) return; // antd TextArea maxLength is not work

    setEditText(value);
  }, []);

  useEffect(() => {
    if (!updatePostDone) return;
    cancleEdit();
  }, [updatePostDone]);

  return (
    <div>
      {isEditting
        ? (
          <>
            <Input.TextArea value={editText} onChange={onChangeEditText} />
            <Button.Group style={{ float: 'right' }}>
              <Button
                type="primary"
                loading={updatePostLoading}
                onClick={() => requestEdit(editText)}
              >
                수정
              </Button>
              <Button
                type="danger"
                onClick={cancleEdit}
              >
                취소
              </Button>
            </Button.Group>
          </>
        )
        : (
          postData.split(hashtagRegex).map((v, i) => {
            if (v.match(hashtagRegex)) {
              return (
              // eslint-disable-next-line react/no-array-index-key
                <Link href={`/hashtag/${v.slice(1)}`} key={i} prefetch={false}>
                  <a style={{ color: 'rgb(0, 0, 238)' }}>{v}</a>
                </Link>
              );
            }
            return v;
          })
        )}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  isEditting: PropTypes.bool,
  cancleEdit: PropTypes.func,
  requestEdit: PropTypes.func,
};

PostCardContent.defaultProps = {
  isEditting: false,
  cancleEdit: () => {},
  requestEdit: () => {},
};

export default PostCardContent;
