import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, loadFollowersLoading, loadFollowingsLoading } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const loadMoreData = (setLimitFunc, more = 3) => {
    setLimitFunc((prev) => prev + more);
  };

  useEffect(() => {
    if (me === null) Router.replace('/');
  }, [me]);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      data: followersLimit,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      data: followingsLimit,
    });
  }, []);

  return (
    <>
      <Head>
        <title>내 프로필 | bearsns</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={me?.Followings}
          onClickMore={() => loadMoreData(setFollowingsLimit)}
          loading={loadFollowingsLoading}
        />
        <FollowList
          header="팔로워 목록"
          data={me?.Followers}
          onClickMore={() => loadMoreData(setFollowersLimit)}
          loading={loadFollowersLoading}
        />
      </AppLayout>
    </>
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

export default Profile;
