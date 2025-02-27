/* 4.16. Больше деталей
Структура каждого объекта должна быть следующей:

id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.

url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

description, строка — описание фотографии. Описание придумайте самостоятельно.

likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}


У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.

Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!


Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.

/****************************************************************************************************************************************/
const DESCRIPTIONS = [
  'Прекрасный момент! 🌟',
  'Незабываемые впечатления! ✨',
  'Потрясающий вид! 🌄',
  'Идеальный кадр! 📸',
  'Фото на память ',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const COUNT_OF_PHOTO = 25;
const MIN_COUNT_OF_MESSAGE_TEXT = 1;
const MAX_COUNT_OF_MESSAGE_TEXT = 2;
const MIN_COUNT_OF_AVATAR = 1;
const MAX_COUNT_OF_AVATAR = 6;
const MIN_COUNT_OF_LIKES = 15;
const MAX_COUNT_OF_LIKES = 200;
const MIN_COUNT_OF_COMMENT = 0;
const MAX_COUNT_OF_COMMENT = 30;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Генератор ID для комментариев
const createCommentIdGenerator = () => {
  let commentIdCounter = 0;
  return () => ++commentIdCounter;
};
const generateCommentId = createCommentIdGenerator();


// Функция для генерации сообщения
const getMessageText = () => {
  const count = getRandomInteger (MIN_COUNT_OF_MESSAGE_TEXT, MAX_COUNT_OF_MESSAGE_TEXT);
  return Array.from({length: count}, () => getRandomArrayElement(MESSAGE)).join(' ');
};

// Функция создания комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger (MIN_COUNT_OF_AVATAR, MAX_COUNT_OF_AVATAR)}.svg`,
  message: getMessageText(),
  name: getRandomArrayElement(NAMES)
});

// Функция создания фото
const createPhoto = (index) => ({

  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),

  // Добавляем генерацию лайков (15-200)
  likes: getRandomInteger(MIN_COUNT_OF_LIKES, MAX_COUNT_OF_LIKES),

  // Генерируем от О до ЗО комментариев
  comments: Array.from({length: getRandomInteger(MIN_COUNT_OF_COMMENT, MAX_COUNT_OF_COMMENT)},() => createComment())

});


// Создаём альбом
const albumOfPhoto = Array.from({length: COUNT_OF_PHOTO},(_, index) => createPhoto(index));

console.log(albumOfPhoto);


