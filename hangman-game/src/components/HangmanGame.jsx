// src/components/HangmanGame.js

import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard"; // Import the keyboard component
import HangmanCanvas from "./HangmanCanvas";
import WordDisplay from "./WordDisplay";
import GameMessage from "./GameMessage";
import '../App.css';

const words = ["REACT", "JAVASCRIPT", "MONGODB", "NODEJS", "EXPRESS"];
const MAX_WRONG_GUESSES = 5;

const HangmanGame = () => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  useEffect(() => {
    newGame();
  }, []);

  // Function to start a new game
  const newGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  // Handle a guess made by the user
  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || isGameOver || isWinner) return; // Prevent guessing after game over

    setGuessedLetters((prevGuessed) => [...prevGuessed, letter]);

    if (!word.includes(letter)) {
      setWrongGuesses((prevCount) => prevCount + 1);
    }
  };

  // Listen for keyboard inputs
  useEffect(() => {
    const handleKeyPress = (e) => {
      const letter = e.key.toUpperCase(); // Convert the key to uppercase
      if (/^[A-Z]$/.test(letter)) { // Ensure it's a valid letter
        handleGuess(letter);
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [guessedLetters, wrongGuesses, word]); // Dependencies to keep track of state changes

  const isGameOver = wrongGuesses >= MAX_WRONG_GUESSES;
  const isWinner = word.split("").every((letter) => guessedLetters.includes(letter));

  // Display the word with blanks for unguessed letters
  const displayWord = word.split("").map((letter) =>
    guessedLetters.includes(letter) ? letter : "_"
  );

  return (
    <div className="game-container">
      <h1>Hangman Game</h1>
      <HangmanCanvas wrongGuesses={wrongGuesses} />
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <Keyboard
        guessedLetters={guessedLetters}
        handleGuess={handleGuess}
        isGameOver={isGameOver}
        isWinner={isWinner}
      />
      <GameMessage isGameOver={isGameOver} isWinner={isWinner} word={word} />
      <button onClick={newGame} className="new-game">New Game</button>
    </div>
  );
};

export default HangmanGame;
