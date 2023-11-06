"use strict";

const capitalizeWords = (str) => {
  const words = str.split('.');
  const capitalizedWords = words.map((word) => {
    const letters = word.split(' ');
    const capitalizedLetters = letters.map((letter) => {
      if (letter) {
        return letter.charAt(0).toUpperCase() + letter.slice(1);
      }
      return letter;
    });
    return capitalizedLetters.join(' ');
  });
  return capitalizedWords.join('.');
};

module.exports = { capitalizeWords };