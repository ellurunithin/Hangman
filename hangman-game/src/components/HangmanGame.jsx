// src/components/HangmanGame.js

import React, { useState,useEffect } from "react";
import Keyboard from "./Keyboard"; // Import the keyboard component
import HangmanCanvas from "./HangmanCanvas";
import WordDisplay from "./WordDisplay";
import GameMessage from "./GameMessage";
import '../App.css';

const words = ["REACT", "JAVASCRIPT", "MONGODB", "NODEJS", "EXPRESS"];
const MAX_WRONG_GUESSES = 6;

const HangmanGame = () => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter) && !isGameOver && !isWinner) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setWrongGuesses((prev) => Math.min(prev + 1, MAX_WRONG_GUESSES));
      }
    }
  };

  const isGameOver = wrongGuesses >= MAX_WRONG_GUESSES;
  const isWinner = word.split("").every((letter) => guessedLetters.includes(letter));

  return (
    <div className="container">
      <h1>Hangman Game</h1>
      <HangmanCanvas wrongGuesses={wrongGuesses} />
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <Keyboard guessedLetters={guessedLetters} handleGuess={handleGuess} isGameOver={isGameOver} isWinner={isWinner} />
      <GameMessage isGameOver={isGameOver} isWinner={isWinner} word={word} />
      <button onClick={newGame} className="new-game">New Game</button>
    </div>
  );
};

export default HangmanGame;
