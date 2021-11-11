import styled from 'styled-components';

export const CardWrapper = styled.div`
  position: relative;
  padding-top: ${({ isRetweeted }) => (isRetweeted ? '0.66rem' : 0)};
  border: 1px solid #f0f0f0;

  &:not(:last-child) {
    border-bottom: none;
  }

  ::hover

  .ant-form-item {
    margin: 0;
  }
`;

export const RetweetText = styled.p`
  position: absolute;
  top: 0.2rem;
  left: 2.33rem;
  z-index: 1;
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
  
  & > span {
    letter-spacing: 0.01rem;
    font-size: 0.75rem;
    color: #777;
    font-weight: bold;
  }
  
  & > span:first-child { // 아이콘
    font-size: 1.15rem;
    margin-right: 0.33rem;
  }
`;

export const IconWithCountWrapper = styled.section`
    width: 100%;
    height: 100%;
    position: relative;

  & > .anticon {
    display: block;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
    transition: all 50ms ease-in;
  }

  & > p {
    position: absolute;
    top: 50%;
    left: calc(50% + 1.33rem);
    transform: translate(-50%, -50%);
  }

  &:hover,
  &:focus {
    & > .anticon {
      color: #1890ff;
    }
  }
`;

export const Time = styled.time`
  float: right;
  color: gray;
`;
