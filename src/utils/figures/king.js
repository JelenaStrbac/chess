// *** KING *** //
export const king = (board, player, currentRow, currentCol) => {
  const squaresArr = [];
  const currRow = Number(currentRow);
  const currCol = Number(currentCol);

  // down
  if (currRow + 1 <= 7 && board[currRow + 1][currCol]?.[0] !== player)
    squaresArr.push(`${currRow + 1}-${currCol}`);
  // up
  if (currRow - 1 >= 0 && board[currRow - 1][currCol]?.[0] !== player)
    squaresArr.push(`${currRow - 1}-${currCol}`);
  // right
  if (currCol + 1 <= 7 && board[currRow][currCol + 1]?.[0] !== player)
    squaresArr.push(`${currRow}-${currCol + 1}`);
  // left
  if (currCol - 1 >= 0 && board[currRow][currCol - 1]?.[0] !== player)
    squaresArr.push(`${currRow}-${currCol - 1}`);

  // down-right
  if (
    currRow + 1 <= 7 &&
    currCol + 1 <= 7 &&
    board[currRow + 1][currCol + 1]?.[0] !== player
  )
    squaresArr.push(`${currRow + 1}-${currCol + 1}`);

  // down-left
  if (
    currRow + 1 <= 7 &&
    currCol - 1 >= 0 &&
    board[currRow + 1][currCol - 1]?.[0] !== player
  )
    squaresArr.push(`${currRow + 1}-${currCol - 1}`);

  // up-left
  if (
    currRow - 1 >= 0 &&
    currCol - 1 >= 0 &&
    board[currRow - 1][currCol - 1]?.[0] !== player
  )
    squaresArr.push(`${currRow - 1}-${currCol - 1}`);

  // up-right
  if (
    currRow - 1 >= 0 &&
    currCol + 1 <= 7 &&
    board[currRow - 1][currCol + 1]?.[0] !== player
  )
    squaresArr.push(`${currRow - 1}-${currCol + 1}`);

  return squaresArr;
};
