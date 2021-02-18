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
  currentRow: number;
  currentCol: number;
};

// *** BISHOP *** //
export const bishop = ({ board, player, currentRow, currentCol }: Args) => {
  const squaresArr = [];
  const currRow = Number(currentRow);
  const currCol = Number(currentCol);

  // down-right
  for (let i = 1; i <= 7 - Math.max(currRow, currCol); i++) {
    if (
      board[currRow + i][currCol + i] !== null &&
      board[currRow + i][currCol + i]?.[0] !== player
    ) {
      squaresArr.push(`${currRow + i}-${currCol + i}`);
      break;
    }
    if (board[currRow + i][currCol + i] !== null) break;
    squaresArr.push(`${currRow + i}-${currCol + i}`);
  }

  // down-left
  for (let i = 1; i <= Math.min(7 - currRow, currCol); i++) {
    if (
      board[currRow + i][currCol - i] !== null &&
      board[currRow + i][currCol - i]?.[0] !== player
    ) {
      squaresArr.push(`${currRow + i}-${currCol - i}`);
      break;
    }
    if (board[currRow + i][currCol - i] !== null) break;
    squaresArr.push(`${currRow + i}-${currCol - i}`);
  }

  for (let i = 1; i <= Math.min(currRow, currCol); i++) {
    // up-left
    if (
      board[currRow - i][currCol - i] !== null &&
      board[currRow - i][currCol - i]?.[0] !== player
    ) {
      squaresArr.push(`${currRow - i}-${currCol - i}`);
      break;
    }
    if (board[currRow - i][currCol - i] !== null) break;
    squaresArr.push(`${currRow - i}-${currCol - i}`);
  }

  // up-right
  for (let i = 1; i <= Math.min(currRow, 7 - currCol); i++) {
    if (
      board[currRow - i][currCol + i] !== null &&
      board[currRow - i][currCol + i]?.[0] !== player
    ) {
      squaresArr.push(`${currRow - i}-${currCol + i}`);
      break;
    }
    if (board[currRow - i][currCol + i] !== null) break;
    squaresArr.push(`${currRow - i}-${currCol + i}`);
  }

  return squaresArr;
};
