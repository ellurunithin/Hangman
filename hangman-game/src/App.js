// src/App.js

import React from "react";
import HangmanGame from "./components/HangmanGame"; // Import HangmanGame

const App = () => {
  return (
    <div className="App">
      <HangmanGame /> {/* Render the HangmanGame component */}
    </div>
  );
};

export default App;
