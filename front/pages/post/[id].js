import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import axios from 'axios';

import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout/index';
import PostCard from '../../components/PostCard/index';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  console.log('Post', singlePost.Images);

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={singlePost.content} />
        <meta property="og:description" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:image" content={singlePost.Images[0] || 'https://nodebird.com/favicon.ico'} />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { req, store, params } = context;

  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = ''; // 이전 CDN에 올라와 있던 쿠키 초기화
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_POST_REQUEST,
    data: params.id,
  });

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Post;
