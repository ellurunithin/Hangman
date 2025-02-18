import React from "react";

const Keyboard = ({ guessedLetters, handleGuess, isGameOver, isWinner }) => {
  return (
    <div className="letters">
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={guessedLetters.includes(letter) || isGameOver || isWinner}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
