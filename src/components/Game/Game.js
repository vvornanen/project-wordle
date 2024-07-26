import React, { useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { GuessInput } from "../GuessInput";
import { GuessResults } from "../GuessResults";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = useState([]);

  const handleSubmit = (value) => {
    setGuesses([...guesses, value]);
  };

  return (
    <>
      <GuessResults items={guesses} />
      <GuessInput onSubmit={handleSubmit} />
    </>
  );
}

export default Game;
