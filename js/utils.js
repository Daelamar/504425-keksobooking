'use strict';

(function () {
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
    }
  };
})();
