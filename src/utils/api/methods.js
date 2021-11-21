import instance from './instance';

export const getLocations = () => instance.get('locations');
export const getAuthors = () => instance.get('/authors');
export const getPaintings = () => instance.get('/paintings');
export const getPaintingsForPagination = (newUrl) => instance.get(newUrl);
