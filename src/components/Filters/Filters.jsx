import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import style from './style.module.scss';
import Input from '../Input';
import Range from '../Range';
import Paintings from '../Paintings';
import { getAuthorsInfo } from '../../store/slices/authorsInfoSlice';
import { getLocationsInfo } from '../../store/slices/locationInfoSlice';
import Pagination from '../Pagination';
import SelectAuthor from '../SelectAuthor';
import SelectLocation from '../SelectLocation';

const Filters = () => {
  const queryString = require('query-string');
  const parsed = queryString.parse(location.search);
  const authors = useSelector(getAuthorsInfo);
  const locations = useSelector(getLocationsInfo);
  const [selectedLocation, setSelectedLocation] = useState(parsed.location || 'Location');
  const [selectedAuthor, setSelectedAuthor] = useState(parsed.author || 'Author');
  const [selectedNameOfPainting, setSelectedNameOfPainting] = useState(parsed.q || 'Name');
  const [startData, setStartData] = useState(parsed.created_gte);
  const [endData, setEndData] = useState(parsed.created_lte);
  // запись в  в query параметры
  const [params, setParams] = useSearchParams();
  useMemo(() => {
    console.log(params);
    setParams({
      q: selectedNameOfPainting === 'Name' ? '' : selectedNameOfPainting || '',
      author: selectedAuthor === 'Author' ? '' : selectedAuthor || '',
      location: selectedLocation === 'Location' ? '' : selectedLocation || '',
      created_gte: startData || '',
      created_lte: endData || '',
    });
  }, [selectedNameOfPainting, selectedLocation, selectedAuthor, startData, endData]);
  return (
    <div className={style.filter__container}>
      <div className={style.filter__filters}>
        <Input
          selected={selectedNameOfPainting}
          setSelected={setSelectedNameOfPainting}
        />
        <SelectAuthor
          selected={selectedAuthor}
          setSelected={setSelectedAuthor}
          info={authors}
        />
        <SelectLocation
          selected={selectedLocation}
          setSelected={setSelectedLocation}
          info={locations}
        />
        <Range
          startData={startData}
          endData={endData}
          setStartData={setStartData}
          setEndData={setEndData}
        />
      </div>
      <Paintings />
      <Pagination />
    </div>
  );
};
export default Filters;
