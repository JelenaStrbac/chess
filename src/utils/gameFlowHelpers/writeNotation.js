const rows = [8, 7, 6, 5, 4, 3, 2, 1];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const writeNotation = ({ figure, r, c, captured, prevCol }) => {
  if (captured && figure === "P") {
    return `${cols[prevCol]}x${cols[c]}${rows[r]}`;
  } else if (captured && figure !== "P") {
    return `${figure}x${cols[c]}${rows[r]}`;
  } else if (!figure && ((r === 0 && c === 0) || (r === 7 && c === 0))) {
    return `0-0-0`;
  } else if (!figure && ((r === 0 && c === 7) || (r === 7 && c === 7))) {
    return `0-0`;
  }
  return `${figure !== "P" ? figure : ""}${cols[c]}${rows[r]}`;
};
