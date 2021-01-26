import { findAllMoves } from "../findAllMoves";
import { checkmate } from "../checkmate";

export const checkIfKingIsUnderCheckmate = (board, player, notation) => {
  // find all moves of opposite player
  const pawnSpecialMoves = true;
  const allPossibleMoves = findAllMoves(
    board,
    player,
    notation,
    pawnSpecialMoves
  );

  // check if active player KING is under checkmate
  const checkmated = checkmate(board, player, allPossibleMoves);
  return checkmated;
};
