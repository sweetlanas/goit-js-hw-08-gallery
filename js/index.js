import galleryImages from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxConteinerRef = document.querySelector('.js-lightbox');

function imagesItemTemplate({ preview, original, description }) {
  return `
    <li class='gallery__item'>
    <a class='gallery__link' href='${original}'>
    <img
    class='gallery__image'
    src='${preview}' 
    data-source='${original}' 
    alt='${description}'/>
    </a>
    </li>`;
};

let currentInd = null;

const galleryMarkup = galleryImages.map(imagesItemTemplate);

galleryListRef.insertAdjacentHTML('afterbegin', galleryMarkup.join(''));

galleryListRef.addEventListener('click', onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  };
  galleryMarkup.forEach((el, ind) => {
    if (el.includes(e.target.src)) {
      currentInd = ind;
    }
  });

  lightboxConteinerRef.classList.add('is-open');
  lightboxImageRef.src = e.target.dataset.source;
  lightboxImageRef.alt = e.target.alt;
};

function onModalClose(e) {
  lightboxConteinerRef.classList.remove('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
};

lightboxConteinerRef.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'IMG') {
    onModalClose();
  };
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    onModalClose();
  };
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && galleryImages.length - 1 > currentInd) {
    currentInd += 1;
    lightboxImageRef.src = galleryImages[currentInd].original;
    return;
  }
  if (e.key === 'ArrowLeft' && 0 < currentInd) {
    currentInd -= 1;
    lightboxImageRef.src = galleryImages[currentInd].original;
    return;
  }
  if (e.key === 'ArrowRight' && currentInd === galleryImages.length - 1) {
    currentInd = 0;
    lightboxImageRef.src = galleryImages[currentInd].original;
  }
  if (e.key === 'ArrowLeft' && currentInd === 0) {
    currentInd = galleryImages.length - 1;
    lightboxImageRef.src = galleryImages[currentInd].original;
  }
});