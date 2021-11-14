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

    &-head {
      order: -2;
      min-height: initial !important;
      padding: initial !important;
    }

    &-extra {
      padding: initial !important;
      float: initial !important;
      margin-left: initial !important;
    }

    &-body {
      order: -1;
    }

    &-cover {
      padding-left: 4.5rem;
      padding-right: 2rem;
    }

    &-actions {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    &-meta-title {
      font-weight: bold;
      margin-bottom: 0.1rem;
    }

    &-meta-description > div {
      overflow-wrap: break-word;
    }

    .ant-avatar-circle {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;

      .ant-avatar-string {
        font-size: 1.1rem;
        font-weight: 500;
      }
    }
  }

  .ant-form-item {
    position: relative;
    z-index: 3;
  }

  .ant-form-item {
    margin-bottom: initial;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .ant-list {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: -1rem;
  }

  .ant-list-items {
    border-bottom: 5px double #eee;
    margin-bottom: 2rem;
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
  z-index: 999;

  .ant-menu {
    height: ${HEADER_HEIGHT};
    display: flex;
    align-items: center;
  }
`;

const CONTAINER_MAX_WIDTH = '1280px';
export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: ${CONTAINER_MAX_WIDTH};
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  aside {
    position: sticky;
    top: ${HEADER_HEIGHT};
    align-self: start;
  }

  // antd description이 'div' 엘리먼트라 text wrap을 설정하지 못하여 overflow가 발생하는데,
  // 최소한 overflow-wrap: break-word; 라도 설정해놓고 이렇게 main max-width를 맞춰줘야
  // overflow를 막을 수 있음
  @media screen and (min-width: ${CONTAINER_MAX_WIDTH}) {
    main {
      max-width: calc(${CONTAINER_MAX_WIDTH} / 2);
    }
  }

  @media screen and (max-width: ${CONTAINER_MAX_WIDTH}) {
    main {
      max-width: calc(100vw / 2);
    }
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

    main {
      max-width: initial;
      order: 1;
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
