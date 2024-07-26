import React, { useEffect, useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { GuessInput } from "../GuessInput";
import { GuessResults } from "../GuessResults";
import { checkGuess } from "../../game-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function Game() {
  const [answer, setAnswer] = useState(() => sample(WORDS));
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState(undefined);

  useEffect(() => {
    console.info({ answer });
  }, [answer]);

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

  const handleRestart = () => {
    setAnswer(sample(WORDS));
    setGuesses([]);
    setStatus(undefined);
  };

  return (
    <>
      <GuessResults items={guesses} />
      <GuessInput
        guesses={guesses}
        onSubmit={handleSubmit}
        disabled={status !== undefined}
      />
      {status === "won" && (
        <HappyBanner
          numberOfGuesses={guesses.length}
          onRestart={handleRestart}
        />
      )}
      {status === "lost" && (
        <SadBanner answer={answer} onRestart={handleRestart} />
      )}
    </>
  );
}

const HappyBanner = ({ numberOfGuesses, onRestart }) => {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>
          {numberOfGuesses === 1 ? `one guess` : `${numberOfGuesses} guesses`}
        </strong>
        .{" "}
        <button className="banner-button" onClick={() => onRestart()}>
          Restart Game
        </button>
      </p>
    </div>
  );
};

const SadBanner = ({ answer, onRestart }) => {
  return (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.{" "}
        <button className="banner-button" onClick={() => onRestart()}>
          Restart Game
        </button>
      </p>
    </div>
  );
};

export default Game;
