const genereatUrl = (authors, locations, parsed, curentPage, limitOnPage) => {
  const filtredAuthorId = authors.filter((authorInfo) => authorInfo.name === parsed.author)[0]?.id;
  const filtredLocationId = locations.filter(
    (locationInfo) => locationInfo.location === parsed.location,
  )[0]?.id;
  const newUrl = `/paintings?${parsed.q ? `q=${parsed.q}` : ''}
    ${filtredAuthorId ? `&authorId=${filtredAuthorId}` : ''}
    ${filtredLocationId ? `&locationId=${filtredLocationId}` : ''}
    ${parsed.created_gte ? `&created_gte=${parsed.created_gte}` : ''}
    ${parsed.created_lte ? `&created_lte=${parsed.created_lte}` : ''}
    &_page=${curentPage}&_limit=${limitOnPage}`;
  return newUrl.replace(/\s+/g, '');
};
export default genereatUrl;
