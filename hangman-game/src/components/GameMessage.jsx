import React from "react";

const GameMessage = ({ isGameOver, isWinner, word }) => {
  return (
    <div>
      {isGameOver && (
        <p className="game-over">
          Game Over! The word was <strong>{word}</strong>
        </p>
      )}
      {isWinner && <p className="winner">Congratulations! You guessed the word.</p>}
    </div>
  );
};

export default GameMessage;
