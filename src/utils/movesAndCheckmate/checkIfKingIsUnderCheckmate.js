import { findAllMovesAllFigures } from "./findAllMovesAllFigures";
import { isCheckmate } from "./isCheckmate";

export const checkIfKingIsUnderCheckmate = (
  board,
  player,
  notation,
  startFields
) => {
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
  const checkmated = isCheckmate(board, player, allPossibleMoves);
  return checkmated;
};
