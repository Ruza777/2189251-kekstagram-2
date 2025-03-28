import {isEscapeKey, isEnterKey} from './util.js';
import {outputPictures} from './thumbnails.js';
const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const bigPictureOpenElement = document.querySelector('.big-picture__img');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closebigPicture();
  }
};

function openbigPicture () {
  bigPictureElement.classList.remove('hidden');
  outputPictures();

  document.addEventListener('keydown', onDocumentKeydown);
}

function closebigPicture () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureOpenElement.addEventListener('click', () => {
  openbigPicture();
});

bigPictureOpenElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openbigPicture();
  }
});

bigPictureCloseElement.addEventListener('click', () => {
  closebigPicture();
});

bigPictureCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closebigPicture();
  }
});

const renderPictureDetails = (picture) => {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.social__comment-shown-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  //renderComments(data.comments);
};

export { showBigPicture };
