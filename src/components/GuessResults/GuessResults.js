import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH } from "../../constants";

export const GuessResults = ({ items }) => {
  return (
    <div className="guess-results">
      {range(0, NUM_OF_GUESSES_ALLOWED).map((_, index) => (
        <Guess key={index} value={items[index]} />
      ))}
    </div>
  );
};

const Guess = ({ value }) => {
  const characters = value ? [...value] : [];

  return (
    <p className="guess">
      {range(0, WORD_LENGTH).map((_, colIndex) => (
        <span key={colIndex} className="cell">
          {characters[colIndex]}
        </span>
      ))}
    </p>
  );
};
