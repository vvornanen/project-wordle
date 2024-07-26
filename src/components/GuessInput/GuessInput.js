import { useState } from "react";

export const GuessInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ guess: value });
    setValue("");
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        required
        pattern={"^[A-Z]{5}$"}
        title="Enter a five-letter word"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};
