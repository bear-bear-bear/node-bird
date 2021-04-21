import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import router from 'next/router';

import AppLayout from '../components/AppLayout';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  const { me } = useSelector((state) => state.user);
  if (me !== null) router.push('/');

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
