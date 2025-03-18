import axios from 'axios';

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.params = {
  color: 'black',
  orientation: 'landscape',
  per_page: 9,
};
export const fetchPhotos = query => {
  return axios
    .get(
      `https://pixabay.com/api/?key=49397541-1939e7fe1ba522fc58da934d1&q=${query}&image_type=photo`
    )
    .then(response => response.data.hits);
};
