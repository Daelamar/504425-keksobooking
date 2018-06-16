'use strict';

var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var TITLE_LIST = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var CHECKIN_AND_CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var mapArr;
var map = document.querySelector('.map');
var mapPinList = document.querySelector('.map__pins');
var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');
var filtersContainer = document.querySelector('.map__filters-container');
var templateMapCard = document.querySelector('template').content.querySelector('.map__card');
var advertForm = document.querySelector('.ad-form');
var advertFormField = advertForm.querySelectorAll('fieldset');
var advertAdressInput = advertForm.querySelector('#address');
var mapPinMain = map.querySelector('.map__pin--main');
var mapPinMainLeft = mapPinMain.offsetLeft;
var mapPinMainTop = mapPinMain.offsetTop;
var mapPinMainWidth = mapPinMain.offsetWidth;
var mapPinMainHeight = mapPinMain.offsetHeight;
var inputAdressLeft = Math.round(mapPinMainLeft + mapPinMainWidth / 2);
var inputAdressTop = Math.round(mapPinMainTop + mapPinMainHeight / 2);

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomLengthArray = function (array) {
  var newArr = shuffleArray(array.slice());
  return newArr.splice(0, getRandomNumber(1, newArr.length - 1));
};

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

var createOffer = function (index) {
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(130, 630);

  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: TITLE_LIST[index],
      address: locationX + ', ' + locationY,
      price: getRandomNumber(1000, 1000000),
      type: TYPE_LIST[getRandomNumber(0, TYPE_LIST.length - 1)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: CHECKIN_AND_CHECKOUT_LIST[getRandomNumber(0, CHECKIN_AND_CHECKOUT_LIST.length - 1)],
      checkout: CHECKIN_AND_CHECKOUT_LIST[getRandomNumber(0, CHECKIN_AND_CHECKOUT_LIST.length - 1)],
      features: getRandomLengthArray(FEATURES_LIST),
      description: '',
      photos: shuffleArray(PHOTOS_LIST)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

var createAdvertisement = function (numbersOfAdvertisement) {
  var notices = [];
  for (var i = 0; i < numbersOfAdvertisement; i++) {
    notices.push(createOffer(i));
  }
  return notices;
};

var createNewFeatures = function (addFeatures) {
  var newFeature = document.createDocumentFragment();
  for (var j = 0; j < addFeatures.length; j++) {
    var newLi = document.createElement('li');
    newLi.classList.add('popup__feature');
    newLi.classList.add('popup__feature--' + addFeatures[j]);
    newFeature.appendChild(newLi);
  }
  return newFeature;
};

var createNewPhotosList = function (newPhotoList) {
  var photoList = document.createDocumentFragment();
  for (var index = 0; index < PHOTOS_LIST.length; index++) {
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

var disabledFields = function () {
  advertForm.classList.add('ad-form--disabled');

  for (var i = 0; i < advertFormField.length; i++) {
    advertFormField[i].disabled = true;
  }
};

var enabledFields = function () {
  advertForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < advertFormField.length; i++) {
    advertFormField[i].disabled = false;
  }
};

var renderCard = function (mapCards) {
  var popupElement = templateMapCard.cloneNode(true);

  map.addEventListener('click', function (evt) {
    var popupClose = map.querySelector('.popup__close');
    if (evt.target === popupClose) {
      closeCard();
    }
  });

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

var renderPin = function (mapPins) {
  var mapPin = templateMapPin.cloneNode(true);

  mapPin.style.left = mapPins.location.x - PIN_WIDTH / 2 + 'px';
  mapPin.style.top = mapPins.location.y - PIN_HEIGHT + 'px';
  mapPin.querySelector('img').src = mapPins.author.avatar;
  mapPin.querySelector('img').alt = mapPins.offer.title;

  var newCard = renderCard(mapPins);
  mapPin.addEventListener('click', function () {
    closeCard();
    map.insertBefore(newCard, filtersContainer);
  });
  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closeCard();
      map.insertBefore(newCard, filtersContainer);
    }
  });
  return mapPin;
};

var getCreatePins = function (mapPins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mapPins.length; i++) {
    fragment.appendChild(renderPin(mapPins[i]));
  }
  mapPinList.appendChild(fragment);
};

var getEnabledPage = function () {
  map.classList.remove('map--faded');

  mapPinMainLeft = mapPinMain.offsetLeft;
  mapPinMainTop = mapPinMain.offsetTop;
  inputAdressLeft = Math.round(mapPinMainLeft + mapPinMainWidth / 2);
  inputAdressTop = Math.round(mapPinMainTop + mapPinMainHeight / 2);
  advertAdressInput.value = inputAdressLeft + ', ' + inputAdressTop;

  getCreatePins(mapArr);
  enabledFields();
};

var closeCard = function () {
  var oldCard = document.querySelector('.popup');
  if (oldCard) {
    oldCard.remove();
  }
};

mapPinMain.addEventListener('mouseup', getEnabledPage);
disabledFields();
mapArr = createAdvertisement(8);

