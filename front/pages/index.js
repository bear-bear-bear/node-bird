import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

// TODO: react-virtualized 적용하기
const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
  } = useSelector((state) => state.post);

  useEffect(() => {
    function onScroll() {
      const scrollY = Math.round(window.scrollY);
      const { scrollHeight, clientHeight } = document.documentElement;

      const isLoadingSpot = (scrollY + clientHeight) > (scrollHeight - 300);

      if (isLoadingSpot && hasMorePosts && !loadPostsLoading) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        dispatch({
          type: LOAD_POSTS_REQUEST,
          lastId,
        });
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  // 브라우저에 쿠키가 있을 경우 req header에 쿠키 세팅
  const { req, store } = context;

  const cookie = req?.headers.cookie || '';
  axios.defaults.headers.Cookie = ''; // 이전 CDN에 올라와 있던 쿠키 초기화
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Home;
