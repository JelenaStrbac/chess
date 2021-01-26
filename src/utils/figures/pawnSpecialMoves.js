import { pawn } from "./pawn";

export const pawnSpecialMoves = ({
  state,
  board,
  player,
  currRow,
  currCol,
  wanRow,
  wanCol,
  notation,
}) => {
  const movingFigureArray = pawn(board, player, currRow, currCol, notation);

  // en passant
  if (movingFigureArray.includes("en passant")) {
    const numForEnPassantMoving = player === "W" ? 1 : -1;
    state.captured[player].push(
      state.board[Number(wanRow) + numForEnPassantMoving][wanCol]
    );
    state.board[Number(wanRow) + numForEnPassantMoving][wanCol] = null;
  }
  // pawn promotion
  const movingFigureArrayTwo = pawn(board, player, wanRow, wanCol, notation);
  let promote = false;
  if (movingFigureArrayTwo.includes("pawn promotion")) {
    promote = true;
    state.current.figure = `${player}${state.pawnPromotion[player]}`;
  }

  return promote;
};
