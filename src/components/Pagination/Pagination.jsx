import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './style.module.scss';
import { getTheme } from '../../store/slices/themeSlice';
import {
  fetchPaintingsForPagination, getCurentPage, setCurentPage,
  setStartPage, setLastPage, incremetPage, decrementPage, setPerPage,
  getLimitPage, getAllPages, setAllPages,
} from '../../store/slices/paginationSlice';
import createPages from '../../utils/createPages';
import genereatUrl from '../../utils/generateUrl';
import { getAuthorsInfo } from '../../store/slices/authorsInfoSlice';
import { getLocationsInfo } from '../../store/slices/locationInfoSlice';

const cx = classNames.bind(style);

const Pagination = () => {
  const dispatch = useDispatch();
  const authors = useSelector(getAuthorsInfo);
  const locations = useSelector(getLocationsInfo);
  const lightTheme = useSelector(getTheme);
  const curentPage = useSelector(getCurentPage);
  const limitOnPage = useSelector(getLimitPage);
  const allPages = useSelector(getAllPages);
  const container = cx('pagination__container', { pagination__container__theme: !lightTheme });
  const curentPageStyle = cx('pagination__container__curentPage', { pagination__container__curentPage__theme: !lightTheme });
  const numberOfPage = cx('pagination__container__numberOfPage', { pagination__container__numberOfPage__theme: !lightTheme });
  const nextPage = cx('pagination__container__nextPage', {
    pagination__container__nextPage__theme: !lightTheme,
    pagination__container__nextPage__disable: curentPage === allPages,
    pagination__container__nextPage__theme__disable: curentPage === allPages && !lightTheme,
  });
  const prevPage = cx('pagination__container__prevPage', {
    pagination__container__prevPage__theme: !lightTheme,
    pagination__container__prevPage__disable: curentPage === 1,
    pagination__container__prevPage__theme__disable: curentPage === 1 && !lightTheme,

  });
  const firstPage = cx('pagination__container__firstPage', {
    pagination__container__firstPage__theme: !lightTheme,
    pagination__container__firstPage__disable: curentPage === 1,
    pagination__container__firstPage__theme__disable: curentPage === 1 && !lightTheme,

  });
  const lastPage = cx('pagination__container__lastPage', {
    pagination__container__lastPage__theme: !lightTheme,
    pagination__container__lastPage__disable: curentPage === allPages,
    pagination__container__lastPage__theme__disable: curentPage === allPages && !lightTheme,
  });

  // вычисоление лимита картин на странице на основе ширины экрана
  const pageWidth = document.documentElement.scrollWidth;
  const computationPages = Math.ceil(33 / limitOnPage);
  // создание нумерации страниц для пагинация
  const pages = [];
  createPages(pages, allPages, curentPage);
  // генерация url на основе query параметров в строке
  const queryString = require('query-string');
  const parsed = queryString.parse(location.search);
  const newUrl = genereatUrl(authors, locations, parsed, curentPage, limitOnPage);
  useEffect(() => {
    dispatch(setPerPage(pageWidth));
    dispatch(setAllPages(computationPages));
    dispatch(fetchPaintingsForPagination(newUrl));
  }, [curentPage, parsed]);
  return (
    <div className={container}>
      <div
        aria-hidden
        onClick={() => dispatch(setStartPage())}
        className={firstPage}
      >
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.71401 6.49988L7.80231 1.62545C8.16797 1.275 8.16797 0.706895 7.80231 0.356587C7.43665 0.00613754 6.84368 0.00613754 6.47787 0.356587L0.727266 5.86567C0.544436 6.04091 0.453125 6.27034 0.453125 6.49988C0.453125 6.72951 0.544614 6.9591 0.727266 7.13426L6.47787 12.6433C6.84368 12.9939 7.43668 12.9939 7.80231 12.6433C8.16797 12.293 8.16797 11.7248 7.80231 11.3745L2.71401 6.49988ZM13.632 11.3745C13.9977 11.7248 13.9977 12.293 13.632 12.6433C13.2663 12.9939 12.6735 12.9939 12.3075 12.6433L6.55693 7.13428C6.3741 6.95913 6.28293 6.72953 6.28293 6.49991C6.28293 6.27037 6.37427 6.04077 6.55693 5.8657L12.3075 0.356587C12.6735 0.00613754 13.2663 0.00613754 13.632 0.356587C13.9977 0.706895 13.9977 1.27498 13.632 1.62545L8.54358 6.49988L13.632 11.3745Z"
            fill={(curentPage === 1
              && (
                lightTheme ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
              )) || (
              lightTheme ? '#000000' : '#FFFFFF'
            )}
          />
        </svg>
      </div>
      <div
        aria-hidden
        onClick={() => dispatch(decrementPage())}
        className={prevPage}
      >
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.932837 7.13428L6.73159 12.6433C7.10046 12.9939 7.69852 12.9939 8.06721 12.6433C8.43593 12.293 8.43593 11.7248 8.06721 11.3745L2.93621 6.49991L8.06706 1.62545C8.43578 1.275 8.43578 0.706895 8.06706 0.356587C7.69834 0.00613754 7.10031 0.00613754 6.73144 0.356587L0.932687 5.86567C0.748326 6.04091 0.65625 6.27034 0.65625 6.49988C0.65625 6.72953 0.748506 6.95913 0.932837 7.13428Z"
            fill={(curentPage === 1
              && (
                lightTheme ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
              )) || (
              lightTheme ? '#000000' : '#FFFFFF'
            )}
          />
        </svg>
      </div>
      {pages.map((item) => (
        <div
          aria-hidden
          className={curentPage === item ? curentPageStyle : numberOfPage}
          key={item.index}
          onClick={() => dispatch(setCurentPage(item))}
        >
          {item}
        </div>
      ))}
      <div
        aria-hidden
        onClick={() => dispatch(incremetPage())}
        className={nextPage}
      >
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.06716 7.13428L2.26841 12.6433C1.89954 12.9939 1.30148 12.9939 0.932791 12.6433C0.56407 12.293 0.56407 11.7248 0.932791 11.3745L6.06379 6.49991L0.93294 1.62545C0.564219 1.275 0.564219 0.706895 0.93294 0.356587C1.30166 0.00613754 1.89969 0.00613754 2.26856 0.356587L8.06731 5.86567C8.25167 6.04091 8.34375 6.27034 8.34375 6.49988C8.34375 6.72953 8.25149 6.95913 8.06716 7.13428Z"
            fill={(curentPage === allPages
              && (
                lightTheme ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
              )) || (
              lightTheme ? '#000000' : '#FFFFFF'
            )}
          />
        </svg>
      </div>
      <div
        aria-hidden
        onClick={() => dispatch(setLastPage())}
        className={lastPage}
      >
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.286 6.49988L6.19769 1.62545C5.83203 1.275 5.83203 0.706895 6.19769 0.356587C6.56335 0.00613754 7.15632 0.00613754 7.52213 0.356587L13.2727 5.86567C13.4556 6.04091 13.5469 6.27034 13.5469 6.49988C13.5469 6.72951 13.4554 6.9591 13.2727 7.13426L7.52213 12.6433C7.15632 12.9939 6.56332 12.9939 6.19769 12.6433C5.83203 12.293 5.83203 11.7248 6.19769 11.3745L11.286 6.49988ZM0.367995 11.3745C0.00233503 11.7248 0.00233503 12.293 0.367995 12.6433C0.733655 12.9939 1.32645 12.9939 1.69247 12.6433L7.44307 7.13428C7.6259 6.95913 7.71707 6.72953 7.71707 6.49991C7.71707 6.27037 7.62573 6.04077 7.44307 5.8657L1.69247 0.356587C1.32648 0.00613754 0.733655 0.00613754 0.367995 0.356587C0.00233503 0.706895 0.00233503 1.27498 0.367995 1.62545L5.45642 6.49988L0.367995 11.3745Z"
            fill={(curentPage === allPages
              && (
                lightTheme ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
              )) || (
              lightTheme ? '#000000' : '#FFFFFF'
            )}
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
