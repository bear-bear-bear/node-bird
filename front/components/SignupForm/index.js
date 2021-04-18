import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'antd';


import useInput from '../../hooks/useInput';
import { SIGN_UP_REQUEST } from '../../reducers/user';

import * as S from './styles';

const SignupForm = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
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
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password },
    })
  }, [password, passwordCheck, term]);

  return (
    <S.SignupForm onFinish={onSubmit}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <S.SignupInput
          name="user-email"
          type="email"
          value={email}
          required
          onChange={onChangeEmail}
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
        <S.SubmitButton type="primary" htmlType="submit" loading={signUpLoading}>
          가입하기
        </S.SubmitButton>
      </S.SubmitWrapper>
    </S.SignupForm>
  );
};

export default SignupForm;
