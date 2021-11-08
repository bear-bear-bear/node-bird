import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'antd';

import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../../reducers/post';
import useInput from '../../hooks/useInput';
import { BACK_URL } from '../../config/config';

import * as S from './styles';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('빈 게시글은 제출할 수 없습니다.');
    }
    const formData = new FormData();
    imagePaths.forEach((path) => {
      formData.append('image', path);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    Array.from(e.target.files).forEach((File) => {
      imageFormData.append('image', File);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <S.PostForm encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <S.FloatButton type="primary" htmlType="submit">
          게시글 작성
        </S.FloatButton>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <S.ImagesWrap key={v}>
            <img src={`${BACK_URL}/${v}`} width={200} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </S.ImagesWrap>
        ))}
      </div>
    </S.PostForm>
  );
};

export default PostForm;
