import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from '../ImagesZoom';

import * as S from './styles';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, [])
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, [])

  if (images.length === 1) {
    return (
      <S.OneImageWrapper>
        <S.Image role="presentation" size="auto" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </S.OneImageWrapper>
    )
  }
  if (images.length === 2) {
    return (
      <>
        <S.Image role="presentation" size="halfSize" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <S.Image role="presentation" size="halfSize" src={images[1].src} alt={images[1].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  if (images.length >= 3) {
    return (
      <>
        <div>
          <S.Image role="presentation" size="halfSize" src={images[0].src} alt={images[0].src} onClick={onZoom} />
          <S.MoreWrapper role="presentation" onClick={onZoom}>
            <PlusOutlined />
            <br />
            <span>{images.length - 1}개의 사진 더 보기</span>
          </S.MoreWrapper>
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  return null;
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
