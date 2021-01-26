import { findAllMovesAllFigures } from "./findAllMovesAllFigures";
import { isCheckmate } from "./isCheckmate";

export const checkIfKingIsUnderCheckmate = (board, player, notation) => {
  // find all moves of opposite player
  const pawnSpecialMoves = true;
  const allPossibleMoves = findAllMovesAllFigures(
    board,
    player,
    notation,
    pawnSpecialMoves
  );

  // check if active player KING is under checkmate
  const checkmated = isCheckmate(board, player, allPossibleMoves);
  return checkmated;
};
