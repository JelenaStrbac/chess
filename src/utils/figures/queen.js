import { bishop } from "./bishop";
import { rook } from "./rook";

export const queen = ({ board, player, currentRow, currentCol }) => {
  return [
    ...rook({ board, player, currentRow, currentCol }),
    ...bishop({ board, player, currentRow, currentCol }),
  ];
};
