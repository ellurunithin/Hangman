import React from "react";
import "./WordDisplay.css"; // Import the CSS file

const WordDisplay = ({ word, guessedLetters }) => {
  const displayWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  return (
    <div className="word-display-container">
      <p className="word-display">{displayWord}</p>
    </div>
  );
};

export default WordDisplay;
