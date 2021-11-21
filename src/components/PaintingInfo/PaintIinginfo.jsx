import React from 'react';
import { PropTypes } from 'prop-types';
import style from './style.module.scss';

const PaintingInfo = ({ imgInfo, authors, locations }) => (
  <div className={style.paintingInfo__container}>
    <p className={style.paintingInfo__name}>{`${imgInfo.name}`}</p>
    <p className={style.paintingInfo__descriptions}>
      <span className={style.paintingInfo__titles}>Autor:</span>
      {` ${authors.find(({ id }) => id === imgInfo?.authorId)?.name}`}
    </p>
    <p className={style.paintingInfo__descriptions}>
      <span className={style.paintingInfo__titles}>Сreated:</span>
      <span className={style.paintingInfo__descriptions}>{` ${imgInfo.created}`}</span>
    </p>
    <p className={style.paintingInfo__descriptions}>
      <span className={style.paintingInfo__titles}>Location:</span>
      {` ${locations.find(({ id }) => id === imgInfo?.locationId)?.location}`}
    </p>
  </div>
);
PaintingInfo.propTypes = {
  imgInfo: PropTypes.object,
  authors: PropTypes.array,
  locations: PropTypes.array,
};
PaintingInfo.defaultProps = {
  imgInfo: {},
  authors: [],
  locations: [],
};
export default PaintingInfo;
