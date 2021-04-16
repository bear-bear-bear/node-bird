import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

import { logoutAction } from '../../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          트윗
          <br />@
        </div>,
        <div key="following">
          팔로잉
          <br />@
        </div>,
        <div key="follower">
          팔로워
          <br />@
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>BEAR</Avatar>} title="bear" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
