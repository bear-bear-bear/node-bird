import styled, { createGlobalStyle } from 'styled-components';
import { Input } from 'antd';

export const Global = createGlobalStyle`
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
`;

export const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

export const IconWrapper = styled.span`
  margin-left: 0.2rem;
  margin-right: 0.2rem;
`;
