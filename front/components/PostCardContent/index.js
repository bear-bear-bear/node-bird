import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { RetweetOutlined } from '@ant-design/icons';

import * as S from './styles';

const PostCardContent = ({ postData, retweetFrom }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Link href={`/hashtag/${v.slice(1)}`} key={i}>
            <a href={`hashtag/${v.slice(1)}`}>{v}</a>
          </Link>
        );
      }
      return v;
    })}
    {retweetFrom && (
      <S.RetweetText>
        <span><RetweetOutlined /></span>
        <span>{retweetFrom} <b>Retweeted</b></span>
      </S.RetweetText>
    )}
  </div>
);

PostCardContent.defaultProps = {
  retweetFrom: null,
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  retweetFrom: PropTypes.string,
};

export default PostCardContent;
