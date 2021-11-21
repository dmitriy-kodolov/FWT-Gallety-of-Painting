import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar';
import Filters from './components/Filters';
import style from './style.module.scss';
import { getTheme } from './store/slices/themeSlice';

const cx = classNames.bind(style);

const App = () => {
  const lightTheme = useSelector(getTheme);
  const appClassName = cx('app', { theme: !lightTheme });
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <div className={appClassName}>
              <AppBar />
              <Filters />
            </div>
          )}
        />
        <Route
          path="/:slug"
          element={(
            <div className={appClassName}>
              <AppBar />
              <Filters />
            </div>
        )}
        />
      </Routes>
    </Router>
  );
};

export default App;
