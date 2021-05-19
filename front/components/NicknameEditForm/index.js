import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../../reducers/user';

import * as S from './styles';

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname, setNickname] = useInput(me?.nickname || '');

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
    setNickname('');
  }, [nickname]);

  return (
    <S.NicknameEditForm>
      <S.SearchInput
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
        addonBefore="닉네임"
        enterButton="수정"
      />
    </S.NicknameEditForm>
  );
};

export default NicknameEditForm;
