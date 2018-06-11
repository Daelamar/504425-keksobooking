'use strict';

var pinWidth = 40;
var pinHeight = 40;
var titleList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var checkinAndCheckoutList = ['12:00', '13:00', '14:00'];
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomLengthArray = function (array) {
  var newArray = [];
  var oldArray = shuffleArray(array);
  var arrayLength = oldArray.length;
  var num = getRandomNumber(1, arrayLength);
  for (var i = 0; i < num; i++) {
    newArray.push(oldArray[i]);
  }
  return newArray;
};

/* Не работает
var getRandomLengthArray = function (array) {
  var newArr = array.splice();
  return newArr.splice(0, getRandomNumber(1, newArr.length - 1));
};
*/
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var apartmentsType = function (type) {
  var typeOffer = '';
  switch (type) {
    case 'flat':
      typeOffer = 'Квартира';
      break;
    case 'bungalo':
      typeOffer = 'Бунгало';
      break;
    case 'house':
      typeOffer = 'Дом';
      break;
    case 'palace':
      typeOffer = 'Дворец';
      break;
  }
  return typeOffer;
};

var createAdvertisement = function (numbersOfAdvertisement) {
  var notices = [];
  for (var i = 0; i < numbersOfAdvertisement; i++) {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(130, 630);
    var offers = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titleList[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: typeList[getRandomNumber(0, typeList.length - 1)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: checkinAndCheckoutList[getRandomNumber(0, checkinAndCheckoutList.length - 1)],
        checkout: checkinAndCheckoutList[getRandomNumber(0, checkinAndCheckoutList.length - 1)],
        features: getRandomLengthArray(features),
        description: '',
        photos: shuffleArray(photos)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    console.log(offers.offer.features);
    notices.push(offers);
  }
  return notices;
};

var mapArr = createAdvertisement(8);

var map = document.querySelector('.map');

map.classList.remove('map--faded');

var mapPinList = document.querySelector('.map__pins');
var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');

var renderPin = function (mapPins) {

  var mapPin = templateMapPin.cloneNode(true);

  mapPin.style.left = mapPins.location.x - pinWidth / 2 + 'px';
  mapPin.style.top = mapPins.location.y - pinHeight + 'px';
  mapPin.querySelector('img').src = mapPins.author.avatar;
  mapPin.querySelector('img').alt = mapPins.offer.title;

  return mapPin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < mapArr.length; i++) {
  fragment.appendChild(renderPin(mapArr[i]));
}
mapPinList.appendChild(fragment);

var filtersContainer = document.querySelector('.map__filters-container');
var templateMapCard = document.querySelector('template').content.querySelector('.map__card');

var createNewFeatures = function (addFeatures) {
  var newFeature = document.createDocumentFragment();
  for (var j = 0; j < addFeatures; j++) {
    var newLi = document.createElement('li');
    newLi.classList.add('.popup__feature');
    newLi.classList.add('.popup__feature--' + addFeatures[j]);
    newFeature.appendChild(newLi);
  }
  return newFeature;
};

var createNewPhotosList = function (newPhotoList) {
  var photoList = document.createDocumentFragment();
  for (var index = 0; index < photos.length; index++) {
    var mapCardPhoto = document.createElement('img');
    mapCardPhoto.classList.add('popup__photo');
    mapCardPhoto.src = newPhotoList[index];
    mapCardPhoto.width = '45';
    mapCardPhoto.height = '40';
    mapCardPhoto.alt = 'Фотография жилья';
    photoList.appendChild(mapCardPhoto);
  }
  return photoList;
};

var renderCard = function (mapCards) {

  var popupElement = templateMapCard.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = mapCards.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = mapCards.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = mapCards.offer.price + ' ₽/ночь.';
  popupElement.querySelector('.popup__type').textContent = apartmentsType(mapCards.offer.type);
  popupElement.querySelector('.popup__text--capacity').textContent = mapCards.offer.rooms + ' комнаты для ' + mapCards.offer.guests + ' гостей.';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCards.offer.checkin + ', выезд до ' + mapCards.offer.checkout;
  popupElement.querySelector('.popup__features').innerHTML = '';
  popupElement.querySelector('.popup__features').appendChild(createNewFeatures(mapCards.offer.features));
  popupElement.querySelector('.popup__description').textContent = mapCards.offer.description;
  popupElement.querySelector('.popup__photos').innerHTML = '';
  popupElement.querySelector('.popup__photos').appendChild(createNewPhotosList(mapCards.offer.photos));
  popupElement.querySelector('.popup__avatar').src = mapCards.author.avatar;
  return popupElement;
};
map.insertBefore(renderCard(mapArr[0]), filtersContainer);
