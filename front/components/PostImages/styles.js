import styled from 'styled-components';

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const MoreWrapper = styled.div`
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.66rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.04);
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
