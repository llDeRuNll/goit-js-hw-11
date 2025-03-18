import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos } from './js/pixabay-api';
import { render } from './js/render-function';
import { loader } from './js/render-function';
import { clearGallery } from './js/render-function';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

const onSubmit = event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (query === '') {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      maxWidth: '432px',
    });
    clearGallery();
    return;
  }
  clearGallery();
  loader('add');
  fetchPhotos(query)
    .then(response => {
      if (response.length === 0) {
        return iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          maxWidth: '432px',
        });
      }
      setTimeout(() => {
        render(response);
      }, 1000);
    })
    .catch(err => {
      console.log(err);
      iziToast.error({
        message: 'Something went wrong! Please try again later.',
        position: 'topRight',
        maxWidth: '432px',
      });
    })
    .finally(() => {
      setTimeout(() => {
        loader('remove');
      }, 1000);
    });
};

form.addEventListener('submit', onSubmit);
