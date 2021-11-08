import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from '../ImagesZoom';

import { BACK_URL } from '../../config/config';
import * as S from './styles';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  const sources = images.map((image) => `${BACK_URL}/${image.name}`);

  if (images.length === 1) {
    return (
      <S.OneImageWrapper>
        <S.Image role="presentation" size="auto" src={sources[0]} alt={sources[0]} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </S.OneImageWrapper>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <S.Image role="presentation" size="halfSize" src={sources[0]} alt={sources[0]} onClick={onZoom} />
        <S.Image role="presentation" size="halfSize" src={sources[1]} alt={sources[1]} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length >= 3) {
    return (
      <>
        <div>
          <S.Image role="presentation" size="halfSize" src={sources[0]} alt={sources[0]} onClick={onZoom} />
          <S.MoreWrapper role="presentation" onClick={onZoom}>
            <PlusOutlined />
            <br />
            <span>{images.length - 1}개의 사진 더 보기</span>
          </S.MoreWrapper>
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return null;
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
