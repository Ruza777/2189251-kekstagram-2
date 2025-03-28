import { createAlbumOfPhoto } from './data.js';
import { outputPictures, container } from './thumbnails.js';
import { showBigPicture } from './bigpicture.js';

const pictures = createAlbumOfPhoto();
outputPictures(pictures);

// Делегирование события клика
container.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture');
  if (!picture) {
    return; // Если клик не по карточке, ничего не делаем
  }

  const pictureId = picture.dataset.id;
  const pictureData = pictures[pictureId];

  showBigPicture(pictureData);
});


