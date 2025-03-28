const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const container = document.querySelector('.pictures');

const createPicture = ({ id, comments, description, likes, url }) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.dataset.id = id;
  picture.tabIndex = 0;

  return picture;
};

const outputPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture, index) => {
    const pictureElement = createPicture({...picture,id: index});
    fragment.append(pictureElement);
  });

  container.append(fragment);
};


const clearSimilarList = () => {
  container.innerHTML = '';
};

export { outputPictures, clearSimilarList, container };
