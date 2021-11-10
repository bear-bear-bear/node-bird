import styled from 'styled-components';

export const OneImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const MoreWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.66rem;
  cursor: zoom-in;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
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
  cursor: zoom-in;
`;
