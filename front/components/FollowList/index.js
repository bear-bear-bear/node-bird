import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';

import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../../reducers/user';

import * as S from './styles';

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();

  const onCancle = (id) => () => {
    switch (header) {
      case '팔로잉 목록':
        dispatch({
          type: UNFOLLOW_REQUEST,
          data: id,
        });
        break;
      case '팔로워 목록':
        dispatch({
          type: REMOVE_FOLLOWER_REQUEST,
          data: id,
        });
        break;
      default:
        break;
    }
  };

  return (
    <S.FollowList
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={(
        <S.LoadMore>
          <Button onClick={onClickMore} loading={loading}>더 보기</Button>
        </S.LoadMore>
      )}
      bordered
      dataSource={data}
      renderItem={({ nickname, id }) => (
        <S.FollowItem>
          <Card actions={[<StopOutlined key="stop" onClick={onCancle(id)} />]}>
            <Card.Meta description={nickname} />
          </Card>
        </S.FollowItem>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowList;
