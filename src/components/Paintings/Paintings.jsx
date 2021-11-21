import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.scss';
import PaintingInfo from '../PaintingInfo';
import { fetchAuthorsInfo, getAuthorsInfo } from '../../store/slices/authorsInfoSlice';
import { fetchLocationsInfo, getLocationsInfo } from '../../store/slices/locationInfoSlice';
import { getIsError, getPaintingsPagination, getIsLoad } from '../../store/slices/paginationSlice';

const baseUrlForImg = process.env.REACT_APP_BASE_URL;
const Paintings = () => {
  const dispatch = useDispatch();
  const authors = useSelector(getAuthorsInfo);
  const locations = useSelector(getLocationsInfo);
  const newPaintings = useSelector(getPaintingsPagination);
  const isError = useSelector(getIsError);
  const isLoad = useSelector(getIsLoad);
  useEffect(() => {
    dispatch(fetchAuthorsInfo());
    dispatch(fetchLocationsInfo());
  }, []);

  if (isError) {
    return <p>Ошибка, попробуйте позже</p>;
  }
  if (!isLoad) {
    return <p>Загрузка...</p>;
  }
  if (!newPaintings.length) {
    return <div>Закончились картинки</div>;
  }

  return (
    <div className={style.container}>
      {newPaintings.map((imgInfo) => (
        <div key={imgInfo?.id} className={style.container__containerOfPaint}>
          <img src={`${baseUrlForImg}${imgInfo.imageUrl}`} alt="painting" className={style.container__containerOfPaint__image} />
          <PaintingInfo authors={authors} locations={locations} imgInfo={imgInfo} />
        </div>
      ))}
    </div>
  );
};

export default Paintings;
