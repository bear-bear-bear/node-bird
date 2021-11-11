import styled, { createGlobalStyle } from 'styled-components';
import { Input } from 'antd';

export const Global = createGlobalStyle`
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
