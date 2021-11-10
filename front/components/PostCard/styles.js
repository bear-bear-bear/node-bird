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
  & > .anticon:first-child {
    font-size: 16px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
  }

  & > :last-child {
    padding-left: 0.33rem;
  }
`;

export const Time = styled.time`
  float: right;
  color: gray;
`;
