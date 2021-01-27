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
  startFields,
}) => {
  const movingFigureArray = pawn({
    board,
    player,
    currentRow: currRow,
    currentCol: currCol,
    notation,
    startFields,
  });

  // en passant
  if (movingFigureArray.includes("en passant")) {
    const numForEnPassantMoving = player === "W" ? 1 : -1;
    state.captured[player].push(
      state.board[wanRow + numForEnPassantMoving][wanCol]
    );
    state.board[wanRow + numForEnPassantMoving][wanCol] = null;
  }
  // pawn promotion
  const movingFigureArrayTwo = pawn({
    board,
    player,
    currentRow: currRow,
    currentCol: currCol,
    notation,
    startFields,
  });
  let promote = false;
  if (movingFigureArrayTwo.includes("pawn promotion")) {
    promote = true;
    state.current.figure = `${player}${state.pawnPromotion[player]}`;
  }

  return promote;
};
