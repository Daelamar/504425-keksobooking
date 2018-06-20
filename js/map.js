'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var AFTER_ELEMENT_MAIN_PIN = 22;
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
var RENT_VALUE = {
  flat: {
    min: 1000,
    max: 1000000,
    placeholder: 1000
  },
  house: {
    min: 5000,
    max: 1000000,
    placeholder: 5000
  },
  palace: {
    min: 10000,
    max: 1000000,
    placeholder: 10000
  },
  bungalo: {
    min: 0,
    max: 1000000,
    placeholder: 0
  }
};


var offers;
var mapElement = document.querySelector('.map');
var mapPinListElement = document.querySelector('.map__pins');
var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');
var filtersContainerElement = document.querySelector('.map__filters-container');
var templateMapCard = document.querySelector('template').content.querySelector('.map__card');
var mapPinMainElement = mapElement.querySelector('.map__pin--main');
var mapPinMainLeft = mapPinMainElement.offsetLeft;
var mapPinMainTop = mapPinMainElement.offsetTop;
var mapPinMainWidth = mapPinMainElement.offsetWidth;
var mapPinMainHeight = mapPinMainElement.offsetHeight;
var inputAddressLeft = Math.round(mapPinMainLeft + mapPinMainWidth / 2);
var inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight / 2);

var advertFormElement = document.querySelector('.ad-form');
var advertFormFieldElement = advertFormElement.querySelectorAll('fieldset');
var advertAddressInputElement = advertFormElement.querySelector('#address');
var inputTitleFormElement = advertFormElement.querySelector('#title');
var inputTypeFormElement = advertFormElement.querySelector('#type');
var inputPriceFormElement = advertFormElement.querySelector('#price');
var inputTimeInFormElement = advertFormElement.querySelector('#timein');
var inputTimeOutFormElement = advertFormElement.querySelector('#timeout');
var inputRoomsNumFormElement = advertFormElement.querySelector('#room_number');
var inputCapacityFormElement = advertFormElement.querySelector('#capacity');

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

var disableFields = function () {
  advertFormElement.classList.add('ad-form--disabled');

  for (var i = 0; i < advertFormFieldElement.length; i++) {
    advertFormFieldElement[i].disabled = true;
  }
};

var enableFields = function () {
  advertFormElement.classList.remove('ad-form--disabled');

  for (var i = 0; i < advertFormFieldElement.length; i++) {
    advertFormFieldElement[i].disabled = false;
  }
  checkRoomsAndGuests();
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

var renderPin = function (mapPins) {
  var mapPinElement = templateMapPin.cloneNode(true);
  var newCardElement = renderCard(mapPins);

  mapPinElement.style.left = mapPins.location.x - PIN_WIDTH / 2 + 'px';
  mapPinElement.style.top = mapPins.location.y - PIN_HEIGHT + 'px';
  mapPinElement.querySelector('img').src = mapPins.author.avatar;
  mapPinElement.querySelector('img').alt = mapPins.offer.title;

  createCard(mapPinElement, newCardElement);

  return mapPinElement;
};

var createCard = function (pinElement, cardElement) {
  pinElement.addEventListener('click', function () {
    closeCard();
    mapElement.insertBefore(cardElement, filtersContainerElement);
  });
  pinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      closeCard();
      mapElement.insertBefore(cardElement, filtersContainerElement);
    }
  });
};

var createPins = function (mapPins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mapPins.length; i++) {
    fragment.appendChild(renderPin(mapPins[i]));
  }
  mapPinListElement.appendChild(fragment);
};

var enablePage = function () {
  mapElement.classList.remove('map--faded');

  mapPinMainLeft = mapPinMainElement.offsetLeft;
  mapPinMainTop = mapPinMainElement.offsetTop;
  inputAddressLeft = Math.round(mapPinMainLeft - mapPinMainWidth / 2);
  inputAddressTop = Math.round(mapPinMainTop - mapPinMainHeight - AFTER_ELEMENT_MAIN_PIN);
  advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;

  createPins(offers);
  enableFields();
  setFieldsRequired();
  setMinAndMaxLength();
};

var closeCard = function () {
  var oldCardElement = document.querySelector('.popup');
  if (oldCardElement) {
    oldCardElement.remove();
  }
};

var setFieldsRequired = function () {
  advertAddressInputElement.readonly = true;
  inputTitleFormElement.required = true;
  inputPriceFormElement.required = true;
};

var setMinAndMaxLength = function () {
  inputTitleFormElement.minLength = 30;
  inputTitleFormElement.maxLength = 100;
};

var setPrice = function () {
  var offerType = inputTypeFormElement.value;
  inputPriceFormElement.min = RENT_VALUE[offerType].min;
  inputPriceFormElement.max = RENT_VALUE[offerType].max;
  inputPriceFormElement.placeholder = RENT_VALUE[offerType].placeholder;
};

var checkRoomsAndGuests = function () {
  if ((inputRoomsNumFormElement.value === '100') && (inputCapacityFormElement.value !== '0')) {
    inputCapacityFormElement.setCustomValidity('Не для гостей!');
  } else if (inputRoomsNumFormElement.value < inputCapacityFormElement.value) {
    inputCapacityFormElement.setCustomValidity('Недостаточное кол-во комнат для размещения гостей');
  } else {
    inputCapacityFormElement.setCustomValidity('');
  }
};

var setTime = function (targetElement, mainElement) {
  targetElement.value = mainElement.value;
};


document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    closeCard();
  }
});

inputTypeFormElement.addEventListener('change', setPrice);
inputTimeInFormElement.addEventListener('change', function () {
  setTime(inputTimeOutFormElement, inputTimeInFormElement);
});

inputTimeOutFormElement.addEventListener('change', function () {
  setTime(inputTimeInFormElement, inputTimeOutFormElement);
});

inputRoomsNumFormElement.addEventListener('change', checkRoomsAndGuests);

inputCapacityFormElement.addEventListener('change', checkRoomsAndGuests);

mapElement.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeCard();
  }
});
mapPinMainElement.addEventListener('mouseup', enablePage);
disableFields();

offers = createAdvertisement(8);
advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
