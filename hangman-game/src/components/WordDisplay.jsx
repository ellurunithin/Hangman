import React from "react";

const WordDisplay = ({ word, guessedLetters }) => {
  const displayWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  return <p>{displayWord}</p>;
};

export default WordDisplay;
