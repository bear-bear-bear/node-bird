import { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'antd';

import { addPost } from '../../reducers/post';

import * as S from './styles';

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText('');
  }, []);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <S.PostForm encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <S.FloatButton type="primary" htmlType="submit">
          트윗하기
        </S.FloatButton>
      </div>
      <div>
        {imagePaths.map((v) => (
          <imagesWrap key={v}>
            <img src={v} width={200} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </imagesWrap>
        ))}
      </div>
    </S.PostForm>
  );
};

export default PostForm;
