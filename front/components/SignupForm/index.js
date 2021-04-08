import { React, useState, useCallback } from 'react';

import useInput from '../../hooks/useInput';
import { Checkbox } from 'antd';

import * as S from './styles';

const SignupForm = () => {
  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <S.SignupForm onFinish={onSubmit}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <S.SignupInput
          name="user-id"
          value={id}
          required
          onChange={onChangeId}
        />
      </div>
      <div>
        <label htmlFor="user-nickname">닉네임</label>
        <br />
        <S.SignupInput
          name="user-nickname"
          value={nickname}
          required
          onChange={onChangeNickname}
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <S.SignupInput
          name="user-password"
          type="password"
          value={password}
          required
          onChange={onChangePassword}
        />
      </div>
      <div>
        <label htmlFor="user-password-check">비밀번호체크</label>
        <br />
        <S.SignupInput
          name="user-password-check"
          type="password"
          value={passwordCheck}
          required
          onChange={onChangePasswordCheck}
        />
        {passwordError && (
          <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage>
        )}
      </div>
      <div>
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
          star를 줄 것을 동의합니다.
        </Checkbox>
        {termError && (
          <S.ErrorMessage>약관에 동의하셔야 합니다.</S.ErrorMessage>
        )}
      </div>
      <S.SubmitWrapper>
        <S.SubmitButton type="primary" htmlType="submit">
          가입하기
        </S.SubmitButton>
      </S.SubmitWrapper>
    </S.SignupForm>
  );
};

export default SignupForm;
