import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Input, Button } from 'antd';

import useInput from '../../hooks/useInput';
import { loginAction } from '../../reducers/user';

import * as S from './styles';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(
    (e) => {
      console.log(id, password);
      dispatch(loginAction(id, password));
    },
    [id, password]
  );

  return (
    <S.LoginForm onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <S.ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </S.ButtonWrapper>
    </S.LoginForm>
  );
};

export default LoginForm;
