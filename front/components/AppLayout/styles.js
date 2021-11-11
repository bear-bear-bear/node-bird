import styled, { createGlobalStyle, css } from 'styled-components';
import { Input } from 'antd';

export const Global = createGlobalStyle`
  body {
    max-width: 1280px;
    margin: 0 auto;
  }

  .ant-menu {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }

  .ant-row {
      margin-right: 0 !important;
      margin-left: 0 !important;
  }

  .ant-col:first-child {
      padding-left: 0 !important;
  }

  .ant-col:last-child {
      padding-right: 0 !important;
  }

  .anticon {
    margin-right: 0 !important;
  }
`;

const HEADER_HEIGHT = '3.3rem';
const MEDIA_BREAK_POINT = '800px';

export const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: #fff;

  .ant-menu {
    height: ${HEADER_HEIGHT};
    display: flex;
    align-items: center;
  }
`;

const gridStyles = () => css`
  width: 100%;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  @media screen and (max-width: ${MEDIA_BREAK_POINT}) {
    grid-template-columns: initial;
    display: flex;
    flex-direction: column;
  }
`;

export const Sidebar = styled.section`
  position: fixed;
  top: ${HEADER_HEIGHT};

  ${gridStyles}
  @media screen and (max-width: ${MEDIA_BREAK_POINT}) {
    position: sticky;
    background-color: #fff;
  }
`;

export const Main = styled.main`
  position: relative;
  z-index: -1;

  ${gridStyles}
`;

export const SearchInput = styled(Input.Search)`
  width: 18rem;
  vertical-align: middle;
`;

export const IconWrapper = styled.span`
  margin-left: 0.2rem;
  margin-right: 0.2rem;
`;

export const Anchor = styled.a`
  font-weight: 500;
`;

export const MadebyWrapper = styled.section`
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${MEDIA_BREAK_POINT}) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
`;
