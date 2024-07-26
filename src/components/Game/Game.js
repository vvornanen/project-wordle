import React, { useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { GuessInput } from "../GuessInput";
import { GuessResults } from "../GuessResults";
import { checkGuess } from "../../game-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState(undefined);

  const handleSubmit = (value) => {
    const nextGuesses = [
      ...guesses,
      { value, status: checkGuess(value, answer) },
    ];
    setGuesses(nextGuesses);

    if (value === answer) {
      setStatus("won");
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setStatus("lost");
    }
  };

  return (
    <>
      <GuessResults items={guesses} />
      <GuessInput onSubmit={handleSubmit} disabled={status !== undefined} />
      {status === "won" && <HappyBanner numberOfGuesses={guesses.length} />}
      {status === "lost" && <SadBanner answer={answer} />}
    </>
  );
}

const HappyBanner = ({ numberOfGuesses }) => {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>
          {numberOfGuesses === 1 ? `one guess` : `${numberOfGuesses} guesses`}
        </strong>
        .
      </p>
    </div>
  );
};

const SadBanner = ({ answer }) => {
  return (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );
};

export default Game;
