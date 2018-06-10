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

var getRandom = function (min, max) {
  var rand = Math.random() * (max - min + 1) + min;
  rand = Math.floor(rand);
  return rand;
};

var getRandomLengthArray = function (array) {
  var newArray = [];
  var oldArray = getMixedArray(array);
  var arrayLength = oldArray.length;
  var num = getRandom(1, arrayLength);
  for (var i = 0; i < num; i++) {
    newArray.push(oldArray[i]);
  }
  return newArray;
};

var getMixedArray = function (array) {
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

var getCreateAdvertisement = function (numbersOfAdvertisement) {
  var notices = [];
  for (var i = 0; i < numbersOfAdvertisement; i++) {
    var locationX = getRandom(300, 900);
    var locationY = getRandom(130, 630);
    var offers = {
      author: {
        avatar: 'img/avatars/user0' + [i + 1] + '.png'
      },
      offer: {
        title: titleList[i],
        address: locationX + ', ' + locationY,
        price: getRandom(1000, 1000000),
        type: typeList[getRandom(0, typeList.length - 1)],
        rooms: getRandom(1, 5),
        guests: getRandom(1, 10),
        checkin: checkinAndCheckoutList[getRandom(0, checkinAndCheckoutList.length - 1)],
        checkout: checkinAndCheckoutList[getRandom(0, checkinAndCheckoutList.length - 1)],
        features: getRandomLengthArray(features),
        description: '',
        photos: getMixedArray(photos)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    notices.push(offers);
  }
  return notices;
};

var mapArr = getCreateAdvertisement(8);

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
var pins = getCreateAdvertisement(8);
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapPinList.appendChild(fragment);

var filtersContainer = document.querySelector('.map__filters-container');
var templateMapCard = document.querySelector('template').content.querySelector('.map__card');

var createNewFeatures = function (addFeatures) {
  var newFeature = document.createDocumentFragment();
  for (i = 0; i < addFeatures; i++) {
    var newLi = document.createElement('li');
    newLi.classList.add('.popup__feature');
    newLi.classList.add('.popup__feature--' + addFeatures[i]);
    newFeature.appendChild(newLi);
  }
  return newFeature;
};

var createNewPhotosList = function (NewPhotoList) {
  var photoList = document.createDocumentFragment();
  for (i = 0; i < photos.length; i++) {
    var mapCardPhoto = document.createElement('img');
    mapCardPhoto.classList.add('popup__photo');
    mapCardPhoto.src = NewPhotoList[i];
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
  popupElement.querySelector('.popup__photos').innerHTML = '';
  popupElement.querySelector('.popup__photos').appendChild(createNewPhotosList(mapCards.offer.photos));
  popupElement.querySelector('.popup__avatar').src = mapCards.author.avatar;
  return popupElement;
};
map.insertBefore(renderCard(mapArr[0]), filtersContainer);
