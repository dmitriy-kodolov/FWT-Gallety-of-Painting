import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import { getTheme } from '../../store/slices/themeSlice';

const cx = classNames.bind(style);

const Input = ({ selected, setSelected }) => {
  const lightTheme = useSelector(getTheme);
  const className = cx('input__container', { input__container__theme: !lightTheme });
  return (
    <input
      className={className}
      type="text"
      placeholder={selected}
      onChange={(e) => {
        setSelected(e.target.value);
      }}
    />
  );
};
Input.propTypes = {
  setSelected: PropTypes.func,
  selected: PropTypes.string,
};
Input.defaultProps = {
  setSelected: () => {},
  selected: '',
};
export default Input;
