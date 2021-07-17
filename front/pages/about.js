import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import { Avatar, Card } from 'antd';

import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_USER_REQUEST } from '../reducers/user';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>bear-bear-bear | NodeBird</title>
      </Head>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                트윗하기
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로잉
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
              description="개발자 지망생"
            />
          </Card>
        )
        : null}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  const { dispatch, sagaTask } = context.store;

  dispatch({
    type: LOAD_USER_REQUEST,
    data: 1, // 임시 유저 번호
  });

  dispatch(END);
  await sagaTask.toPromise();
});

export default About;
