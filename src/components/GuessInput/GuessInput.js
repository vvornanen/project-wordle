import { useState } from "react";
import { WORD_LENGTH } from "../../constants";

export const GuessInput = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        required
        pattern={`^[A-Z]{${WORD_LENGTH}}$`}
        title="Enter a five-letter word"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};
