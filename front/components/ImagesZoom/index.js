import { useState } from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';

import * as S from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(images);

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
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide + 1)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <S.ImageWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
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
