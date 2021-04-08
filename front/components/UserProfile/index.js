import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, [])

  return (
    <Card
      actions={[
        <div key="twit">트윗<br />@</div>,
        <div key="following">팔로잉<br />@</div>,
        <div key="follower">팔로워<br />@</div>
      ]}
    >
      <Card.Meta 
        avatar={<Avatar>BEAR</Avatar>}
        title="bear"
      />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
