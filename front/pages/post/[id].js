import React from 'react';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>{`${id}번 게시글`}</div>
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
