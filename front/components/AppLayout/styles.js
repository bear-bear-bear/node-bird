import styled, { createGlobalStyle } from 'styled-components';
import { Input } from 'antd';

export const Global = createGlobalStyle`
  body {
    max-width: 1280px;
    margin: 0 auto;
  }

  .ant-card {
    display: flex;
    flex-direction: column;

    > .ant-card-body {
      order: -1;
    }

    > .ant-card-cover {
      padding: 0 2rem;
    }

    > .ant-card-actions {
      padding: 0 2rem;
    }
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
  z-index: 1;

  .ant-menu {
    height: ${HEADER_HEIGHT};
    display: flex;
    align-items: center;
  }
`;

export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  aside {
    position: sticky;
    top: ${HEADER_HEIGHT};
    align-self: start;
  }

  @media screen and (max-width: ${MEDIA_BREAK_POINT}) {
    grid-template-columns: initial;
    display: flex;
    flex-direction: column;

    aside {
      position: static;
      top: initial;
      align-self: initial;
    }
  }
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
