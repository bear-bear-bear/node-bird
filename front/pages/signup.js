import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import SignupForm from '../components/SignupForm';

const Signup = () => {
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
