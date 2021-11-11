import styled from 'styled-components';
import { Form } from 'antd';

export const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 0.33rem;
  padding: 10px;

  label {
    font-size: 1.1rem;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
