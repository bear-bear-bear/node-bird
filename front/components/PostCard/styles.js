import styled from 'styled-components';

export const CardWrapper = styled.div`
  box-shadow: 0 0 1px #fcfcfc,
                    0 0 2px #fcfcfc,
                    0 0 4px #fcfcfc,
                    0 0 10px #fcfcfc;
  margin-bottom: 1.33rem;

  &:first-child {
    margin-top: 0.33rem;
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
