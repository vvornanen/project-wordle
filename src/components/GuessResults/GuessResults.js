export const GuessResults = ({ items }) => {
  return (
    <div className="guess-results">
      {items.map((item) => (
        <p key={item.id} className="guess">
          {item.value}
        </p>
      ))}
    </div>
  );
};
