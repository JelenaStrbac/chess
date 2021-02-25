import { bishop } from "./bishop";
import { rook } from "./rook";

type Args = {
  board: (
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
  )[][];
  player: "W" | "B";
  currentRow: number;
  currentCol: number;
};

export const queen = ({ board, player, currentRow, currentCol }: Args) => {
  return [
    ...rook({ board, player, currentRow, currentCol }),
    ...bishop({ board, player, currentRow, currentCol }),
  ];
};
