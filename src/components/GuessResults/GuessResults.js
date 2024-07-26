import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH } from "../../constants";

export const GuessResults = ({ items }) => {
  return (
    <div className="guess-results">
      {range(0, NUM_OF_GUESSES_ALLOWED).map((_, index) => (
        <Guess key={index} item={items[index]} />
      ))}
    </div>
  );
};

const Guess = ({ item }) => {
  const characters = item ? item.status : [];

  return (
    <p className="guess">
      {range(0, WORD_LENGTH).map((_, colIndex) => {
        const status = characters[colIndex]?.status;
        const className = status ? `cell ${status}` : "cell";
        return (
          <span key={colIndex} className={className}>
            {characters[colIndex]?.letter}
          </span>
        );
      })}
    </p>
  );
};
