import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '49397541-1939e7fe1ba522fc58da934d1';
export const fetchPhotos = async query => {
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        color: 'black',
        per_page: 9,
      },
    });

    return response.data.hits.map(
      ({
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      })
    );
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};
