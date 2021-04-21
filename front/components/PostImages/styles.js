import styled from 'styled-components';

export const OneImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const MoreWrapper = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

const imageWidth = {
  halfSize: '50%',
  auto: 'auto',
};

export const Image = styled.img`
  display: inline-block;
  max-height: ${({ size }) => (size === 'auto' ? '60vh' : 'initial')};
  width: ${({ size }) => imageWidth[size] || '100%'};
  max-width: 100%;
  cursor: pointer;
`;
