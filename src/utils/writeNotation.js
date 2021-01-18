const rows = [8, 7, 6, 5, 4, 3, 2, 1];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

const writeNotation = (figure, r, c, captured, prevCol) => {
  if (captured) {
    return `${cols[prevCol]}x${cols[c]}${rows[r]}`;
  }
  return `${figure[1] !== "P" ? figure[1] : ""}${cols[c]}${rows[r]}`;
};

export default writeNotation;
