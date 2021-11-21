import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import { getTheme } from '../../store/slices/themeSlice';

const cx = classNames.bind(style);

const Range = ({
  startData, endData, setStartData, setEndData,
}) => {
  const [isActive, setIsActive] = useState(false);
  const lightTheme = useSelector(getTheme);
  const rangeClassName = cx('range', { range__theme: !lightTheme });
  const contentClassName = cx('range__content', { range__content__theme: !lightTheme });
  const inputClassName = cx('range__content__input', { range__content__input__theme: !lightTheme });
  const tireClassName = cx('planka', { planka__theme: !lightTheme });
  const dropClassName = cx('range__btn__image', { range__btn__flipped: isActive });
  return (
    <div className={rangeClassName}>
      <div aria-hidden="true" className={style.range__btn} onClick={() => setIsActive(!isActive)}>
        <p>Created</p>
        <img
          className={dropClassName}
          src={!lightTheme ? 'darkThemeDrop.svg' : 'lightThemeDrop.svg'}
          alt="Vector.svg"
        />
      </div>
      {isActive && (
        <div className={contentClassName}>
          <input
            className={inputClassName}
            type="text"
            placeholder={startData || 'from'}
            onChange={(e) => setStartData(e.target.value)}
          />
          <div className={tireClassName} />
          <input
            className={inputClassName}
            type="text"
            placeholder={endData || 'before'}
            onChange={(e) => setEndData(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
Range.propTypes = {
  setStartData: PropTypes.func,
  setEndData: PropTypes.func,
  endData: PropTypes.string,
  startData: PropTypes.string,
};
Range.defaultProps = {
  setEndData: () => {},
  setStartData: () => {},
  endData: '',
  startData: '',
};
export default Range;
