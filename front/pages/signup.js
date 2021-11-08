import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import SignupForm from '../components/SignupForm';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Signup = () => {
  const { me } = useSelector((state) => state.user);
  const { signUpDone } = useSelector((state) => state.user);

  useEffect(() => {
    if (me !== null) Router.replace('/');
    if (signUpDone) Router.replace('/');
  }, [me, signUpDone]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <SignupForm />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { req, store } = context;

  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = ''; // 이전 CDN에 올라와 있던 쿠키 초기화
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Signup;
