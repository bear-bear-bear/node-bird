import styled from 'styled-components';

export const RetweetText = styled.p`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 0 !important;
  
  & > span {
    letter-spacing: 0.03rem;
    font-size: 0.85rem;
    color: #777;
  }
  
  & > span:first-child { // 아이콘
    font-size: 1.33rem;
    margin-right: 0.33rem;
  }
`;
