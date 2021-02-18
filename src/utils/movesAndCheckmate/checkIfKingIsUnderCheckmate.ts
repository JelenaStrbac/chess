import { findAllMovesAllFigures } from "./findAllMovesAllFigures";
import { isCheckmate } from "./isCheckmate";

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
  notation: string[];
  startFields: string[];
};

export const checkIfKingIsUnderCheckmate = ({
  board,
  player,
  notation,
  startFields,
}: Args) => {
  // find all moves of opposite player
  const pawnDiagonal = true;
  const allPossibleMoves = findAllMovesAllFigures({
    board,
    player,
    notation,
    pawnDiagonal,
    startFields,
  });

  // check if active player KING is under checkmate
  const checkmated = isCheckmate({ board, player, allPossibleMoves });
  //debugger;
  return checkmated;
};
