import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => {
  const hashtagRegex = /(#[^\s#]+)/g;

  return (
    <div>
      {postData.split(hashtagRegex).map((v, i) => {
        if (v.match(hashtagRegex)) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Link href={`/hashtag/${v.slice(1)}`} key={i} prefetch={false}>
              <a style={{ color: 'rgb(0, 0, 238)' }}>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
