// *** KNIGHT *** //
export const knight = ({ board, player, currentRow, currentCol }) => {
  const squaresArr = [];
  const currRow = Number(currentRow);
  const currCol = Number(currentCol);

  // down-right
  if (
    currRow + 1 <= 7 &&
    currCol + 2 <= 7 &&
    board[currRow + 1][currCol + 2]?.[0] !== player
  )
    squaresArr.push(`${currRow + 1}-${currCol + 2}`);
  if (
    currRow + 2 <= 7 &&
    currCol + 1 <= 7 &&
    board[currRow + 2][currCol + 1]?.[0] !== player
  )
    squaresArr.push(`${currRow + 2}-${currCol + 1}`);

  // down-left
  if (
    currRow + 2 <= 7 &&
    currCol - 1 >= 0 &&
    board[currRow + 2][currCol - 1]?.[0] !== player
  )
    squaresArr.push(`${currRow + 2}-${currCol - 1}`);
  if (
    currRow + 1 <= 7 &&
    currCol - 2 >= 0 &&
    board[currRow + 1][currCol - 2]?.[0] !== player
  )
    squaresArr.push(`${currRow + 1}-${currCol - 2}`);

  // up-left
  if (
    currRow - 2 >= 0 &&
    currCol - 1 >= 0 &&
    board[currRow - 2][currCol - 1]?.[0] !== player
  )
    squaresArr.push(`${currRow - 2}-${currCol - 1}`);
  if (
    currRow - 1 >= 0 &&
    currCol - 2 >= 0 &&
    board[currRow - 1][currCol - 2]?.[0] !== player
  )
    squaresArr.push(`${currRow - 1}-${currCol - 2}`);

  // up-left
  if (
    currRow - 2 >= 0 &&
    currCol + 1 <= 7 &&
    board[currRow - 2][currCol + 1]?.[0] !== player
  )
    squaresArr.push(`${currRow - 2}-${currCol + 1}`);
  if (
    currRow - 1 >= 0 &&
    currCol + 2 <= 7 &&
    board[currRow - 1][currCol + 2]?.[0] !== player
  )
    squaresArr.push(`${currRow - 1}-${currCol + 2}`);

  return squaresArr;
};
