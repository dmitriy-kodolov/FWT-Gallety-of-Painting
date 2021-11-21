import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, getTheme } from '../../store/slices/themeSlice';
import style from './style.module.scss';

const AppBar = () => {
  const dispatch = useDispatch();
  const lightTheme = useSelector(getTheme);
  return (
    <div className={style.appBar__container}>
      <img src="Logo.svg" alt="#Logo" />
      <img
        aria-hidden
        onClick={() => dispatch(setTheme())}
        src={lightTheme ? 'darkTheme.svg' : 'lightTheme.svg'}
        alt="#theme"
      />
    </div>
  );
};

export default AppBar;
