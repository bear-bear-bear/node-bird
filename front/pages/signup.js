import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  const { me } = useSelector((state) => state.user);
  const { signUpDone, signUpError } = useSelector((state) => state.user);

  useEffect(() => {
    if (me !== null) Router.replace('/');
    if (signUpDone) Router.replace('/');
  }, [me, signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <SignupForm />
    </AppLayout>
  );
};

export default Signup;
