import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from '../ImagesZoom';

import * as S from './styles';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  const sortedImages = [...images].sort((a, b) => a.id - b.id);

  if (sortedImages.length === 1) {
    return (
      <>
        <S.ImageWrapper>
          <S.Image role="presentation" size="auto" src={sortedImages[0].src} alt={sortedImages[0].src} onClick={onZoom} />
        </S.ImageWrapper>
        {showImagesZoom && <ImagesZoom images={sortedImages} onClose={onClose} />}
      </>
    );
  }
  if (sortedImages.length === 2) {
    return (
      <>
        <S.ImageWrapper>
          <S.Image role="presentation" size="halfSize" src={sortedImages[0].src} alt={sortedImages[0].src} onClick={onZoom} />
          <S.Image role="presentation" size="halfSize" src={sortedImages[1].src} alt={sortedImages[1].src} onClick={onZoom} />
        </S.ImageWrapper>
        {showImagesZoom && <ImagesZoom images={sortedImages} onClose={onClose} />}
      </>
    );
  }
  if (sortedImages.length >= 3) {
    return (
      <>
        <S.ImageWrapper>
          <S.Image role="presentation" size="halfSize" src={sortedImages[0].src} alt={sortedImages[0].src} onClick={onZoom} />
          <S.MoreWrapper role="presentation" onClick={onZoom}>
            <PlusOutlined />
            <span>{sortedImages.length - 1}개의 사진 더 보기</span>
          </S.MoreWrapper>
        </S.ImageWrapper>
        {showImagesZoom && <ImagesZoom images={sortedImages} onClose={onClose} />}
      </>
    );
  }
  return null;
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
