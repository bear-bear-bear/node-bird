import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Global = createGlobalStyle`
  // Slick 컴포넌트의 스타일 속성을 덮어씌움
  .slick-slide {
    display: inline-block;
  }

  // fixed인 Overlay가 ant-card transform 안에서 스타일 에러 나는걸 방지
  .ant-card-cover {
    transform: none !important; 
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Header = styled.header`
  height: 3rem;
  background: #fff;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 1rem;
    color: #333;
    line-height: 3rem;
  }
`;

export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 999;
  padding: 0.5rem;
  line-height: 0.9;
  cursor: pointer;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 1.33rem;
  font-weight: 700;
  border-radius: 50%;
  transition: transform 0.1s ease-in-out;
  will-change: transform;

  :hover,
  :focus {
    transform: scale(1.1);
  }
`;

export const SlickWrapper = styled.div`
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
`;

export const ImageWrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  & img {
    width: 100vw;
    max-width: 80vh;
    height: auto;
  }
`;

export const Indicator = styled.div`
  margin-top: 1rem;
  text-align: center;

  & > div {
    width: 4.8rem;
    height: 2.25rem;
    line-height: 2.25;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 1rem;
  }
`;
