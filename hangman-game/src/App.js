import React, { useState, useEffect } from "react";
import Keyboard from "./components/Keyboard";
import HangmanCanvas from "./components/HangmanCanvas";
import WordDisplay from "./components/WordDisplay";
import GameMessage from "./components/GameMessage";
import './App.css';

const words = ["REACT", "JAVASCRIPT", "MONGODB", "NODEJS", "EXPRESS"];
const MAX_WRONG_GUESSES = 5;

const App = () => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showGameScreen, setShowGameScreen] = useState(false);

  // Function to start a new game
  const newGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setIsGameStarted(true);
    setShowGameScreen(true); // Show the game screen
  };

  // Handle a guess made by the user
  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || isGameOver || isWinner) return;

    setGuessedLetters((prevGuessed) => [...prevGuessed, letter]);

    if (!word.includes(letter)) {
      setWrongGuesses((prevCount) => prevCount + 1);
    }
  };

  // Listen for keyboard inputs (only when the game is started)
  useEffect(() => {
    if (!isGameStarted) return;

    const handleKeyPress = (e) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
        handleGuess(letter);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [guessedLetters, wrongGuesses, word, isGameStarted]);

  const isGameOver = wrongGuesses >= MAX_WRONG_GUESSES;
  const isWinner = word.split("").every((letter) => guessedLetters.includes(letter));

  // Redirect to Play Game page after game ends
  useEffect(() => {
    if (isGameOver || isWinner) {
      setTimeout(() => {
        setShowGameScreen(false);
        setIsGameStarted(false);
      }, 2000); // Redirect after 2 seconds
    }
  }, [isGameOver, isWinner]);

  return (
    <div className="game-container">
      <h1>Hangman Game</h1>
      
      {!showGameScreen ? (
        <button onClick={newGame} className="start-game">Play Game</button>
      ) : (
        <>
          <HangmanCanvas wrongGuesses={wrongGuesses} />
          <WordDisplay word={word} guessedLetters={guessedLetters} />
          <Keyboard
            guessedLetters={guessedLetters}
            handleGuess={handleGuess}
            isGameOver={isGameOver}
            isWinner={isWinner}
          />
          <GameMessage isGameOver={isGameOver} isWinner={isWinner} word={word} />
        </>
      )}
    </div>
  );
};

export default App;
