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
`

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
`

export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  line-height: 0.9;
  cursor: pointer;
`

export const SlickWrapper = styled.div`
  height: calc(100% - 3rem);
  background: #090909;
`

export const ImageWrapper = styled.div`
  padding: 2rem;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`

export const Indicator = styled.div`
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
`