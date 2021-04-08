import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';

import * as S from './styles';

const FollowList = ({ header, data }) => {
  const grid = { gutter: 4, xs: 2, md: 3 };

  const Header = (
    // 함수형으로 쓰지 않은건 의도된 것
    <div>{header}</div>
  );

  const LoadMore = (
    // 함수형으로 쓰지 않은건 의도된 것
    <S.LoadMore>
      <Button>더 보기</Button>
    </S.LoadMore>
  );

  const Item = (item) => (
    <S.FollowItem>
      <Card actions={[<StopOutlined key="stop" />]}>
        <Card.Meta description={item.nickname} />
      </Card>
    </S.FollowItem>
  );

  return (
    <S.FollowList
      grid={grid}
      size="small"
      header={Header}
      loadMore={LoadMore}
      bordered
      dataSource={data}
      renderItem={Item}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
