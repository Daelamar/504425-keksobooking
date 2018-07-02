'use strict';

(function () {
  var errorElement = document.createElement('div');
  var hideErrorMessage = function () {
    setTimeout(function () {
      errorElement.remove();
    }, 5000);
  };
  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getRandomLengthArray: function (array) {
      var newArr = window.utils.shuffleArray(array.slice());
      return newArr.splice(0, window.utils.getRandomNumber(1, newArr.length - 1));
    },
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    onError: function (errorMessage) {
      errorElement.classList.add('error-massage');
      errorElement.style.backgroundColor = 'white';
      errorElement.style.color = 'black';
      errorElement.style.textAlign = 'center';
      errorElement.style.position = 'fixed';
      errorElement.style.width = '400px';
      errorElement.style.height = '100px';
      errorElement.style.border = '4px solid black';
      errorElement.style.left = '39%';
      errorElement.style.top = '20%';
      errorElement.style.fontSize = '28px';
      errorElement.style.zIndex = '2';
      errorElement.textContent = errorMessage;
      document.body.appendChild(errorElement);
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          errorElement.remove();
        }
      });
      hideErrorMessage();
    }
  };
})();

