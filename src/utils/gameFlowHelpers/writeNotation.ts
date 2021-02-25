const rows = [8, 7, 6, 5, 4, 3, 2, 1];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

type Args = {
  figure?: string;
  r: number;
  c: number;
  captured:
    | "BB"
    | "BK"
    | "BN"
    | "BP"
    | "BQ"
    | "BR"
    | "WB"
    | "WK"
    | "WN"
    | "WP"
    | "WQ"
    | "WR"
    | null
    | undefined;
  prevCol: number;
};

export const writeNotation = ({ figure, r, c, captured, prevCol }: Args) => {
  if (captured && figure && figure === "P") {
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
