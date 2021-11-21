import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import style from './style.module.scss';
import { getTheme } from '../../store/slices/themeSlice';

const cx = classNames.bind(style);

const SelectAuthor = ({
  setSelected, selected, info,
}) => {
  const [isActive, setIsActive] = useState(false);
  const lightTheme = useSelector(getTheme);
  const selectClassName = cx('select', { select__theme: !lightTheme });
  const contentClassName = cx('select__content', { select__content__theme: !lightTheme });
  const dropClassName = cx('select__btn__image', { select__btn__flipped: isActive });
  const itemClassName = cx('select__content__item', { select__content__item__theme: !lightTheme });
  const containerOfItem = cx(
    { select__content__containerOfItem: lightTheme },
    { select__content__containerOfItem_theme: !lightTheme },
  );

  return (
    <div className={selectClassName}>
      <div aria-hidden="true" className={style.select__btn} onClick={() => setIsActive(!isActive)}>
        <p className={style.select__btn__name}>{selected}</p>
        <img
          className={dropClassName}
          src={!lightTheme ? 'darkThemeDrop.svg' : 'lightThemeDrop.svg'}
          alt="Vector.svg"
        />
      </div>
      {isActive && (
        <div className={contentClassName}>
          {info.map((options) => (
            <div className={containerOfItem}>
              <p
                aria-hidden
                key={options.id}
                className={itemClassName}
                onClick={() => {
                  setSelected(options.name);
                  setIsActive(false);
                }}
              >
                {options.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
SelectAuthor.propTypes = {
  setSelected: PropTypes.func,
  selected: PropTypes.string,
  info: PropTypes.array,
};
SelectAuthor.defaultProps = {
  setSelected: () => {},
  selected: '',
  info: [],
};
export default SelectAuthor;
