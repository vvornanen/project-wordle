import { useState } from "react";
import { WORD_LENGTH } from "../../constants";
import { backspace, Keyboard } from "../Keyboard";

export const GuessInput = ({ guesses, onSubmit, disabled = false }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  const handleClick = (character) => {
    if (character === backspace) {
      setValue(value.slice(0, -1));
    } else {
      setValue(value + character.toUpperCase());
    }
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        required
        disabled={disabled}
        pattern={`^[A-Z]{${WORD_LENGTH}}$`}
        title="Enter a five-letter word"
        value={value}
        onChange={handleChange}
      />
      <Keyboard guesses={guesses} disabled={disabled} onClick={handleClick} />
    </form>
  );
};
