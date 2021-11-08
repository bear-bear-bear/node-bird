import React, { useState } from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';

import * as S from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <S.Overlay>
      <S.Global />
      <S.Header>
        <h1>상세 이미지</h1>
        <S.CloseBtn onClick={onClose}>X</S.CloseBtn>
      </S.Header>
      <S.SlickWrapper>
        <div>
          <Slick
            initialSlide={1}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((image) => (
              <S.ImageWrapper key={image.src}>
                <img src={image.src} alt={image.src} />
              </S.ImageWrapper>
            ))}
          </Slick>
          <S.Indicator>
            <div>
              {currentSlide + 1}
              { ' ' }/{ ' ' }
              {images.length}
            </div>
          </S.Indicator>
        </div>
      </S.SlickWrapper>
    </S.Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
