const movements = {
  P: (board, player, currentRow, currentCol) => {
    let squaresArr = [];
    const currRow = Number(currentRow);
    const currCol = Number(currentCol);

    // WHITE
    if (player === "W") {
      // moving 1 field in front if that field is empty
      if (board[currRow - 1][currCol] === null) {
        squaresArr.push(`${currRow - 1}-${currCol}`);
      }

      // capturing black on diagonal
      if (board[currRow - 1][currCol + 1]?.[0] === "B")
        squaresArr.push(`${currRow - 1}-${currCol + 1}`);
      if (board[currRow - 1][currCol - 1]?.[0] === "B")
        squaresArr.push(`${currRow - 1}-${currCol - 1}`);

      // moving pawn for the first time - allowed to move one or two fields in front if both fields are empty
      if (
        currRow === 6 &&
        board[5][currCol] === null &&
        board[4][currCol] === null
      )
        squaresArr.push(`${currRow - 2}-${currCol}`);
    } else {
      // BLACK
      if (board[currRow + 1][currCol] === null)
        squaresArr.push(`${currRow + 1}-${currCol}`);

      if (board[currRow + 1][currCol - 1]?.[0] === "W")
        squaresArr.push(`${currRow + 1}-${currCol - 1}`);
      if (board[currRow + 1][currCol + 1]?.[0] === "W")
        squaresArr.push(`${currRow + 1}-${currCol + 1}`);

      if (
        currRow === 1 &&
        board[2][currCol] === null &&
        board[3][currCol] === null
      )
        squaresArr.push(`${currRow + 2}-${currCol}`);
    }
    return squaresArr;
  },
};

export default movements;
