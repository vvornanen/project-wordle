import { useMemo } from "react";

export const backspace = Symbol();
const enter = Symbol();

const rows = [
  [..."QWERTYUIOP", backspace],
  [..."ASDFGHJKL", enter],
  [..."ZXCVBNM"],
];

export const Keyboard = ({ guesses, onClick, disabled = false }) => {
  const statusMap = useMemo(
    () =>
      guesses.reduce((acc, guess) => {
        for (const item of guess.status) {
          if (
            !acc[item.letter] ||
            (acc[item.letter] && acc[item.letter] !== "correct")
          ) {
            acc[item.letter] = item.status;
          }
        }

        return acc;
      }, {}),
    [guesses]
  );

  return (
    <div className="keyboard">
      {rows.map((row, index) =>
        row.map((character) => {
          const rowNumber = index + 1;

          if (character === backspace) {
            return (
              <Backspace
                key="backspace"
                row={rowNumber}
                disabled={disabled}
                onClick={onClick}
              />
            );
          } else if (character === enter) {
            return <Enter key="enter" row={rowNumber} disabled={disabled} />;
          } else {
            return (
              <Key
                key={character}
                character={character}
                row={rowNumber}
                status={statusMap[character]}
                disabled={disabled}
                onClick={onClick}
              />
            );
          }
        })
      )}
    </div>
  );
};

const Key = ({ character, row, status, onClick, disabled }) => {
  let className = `keyboard-key keyboard-row-${row} ${status || ""}`.trim();

  const handleClick = () => {
    onClick(character);
  };

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={handleClick}
    >
      {character}
    </button>
  );
};

const Backspace = ({ row, onClick, disabled }) => {
  const handleClick = () => {
    onClick(backspace);
  };

  return (
    <button
      type="button"
      className={`keyboard-key keyboard-row-${row}`}
      disabled={disabled}
      onClick={handleClick}
    >
      ⌫
    </button>
  );
};

const Enter = ({ row, disabled }) => {
  return (
    <button
      type="submit"
      className={`keyboard-key keyboard-row-${row}`}
      disabled={disabled}
    >
      ⏎
    </button>
  );
};
