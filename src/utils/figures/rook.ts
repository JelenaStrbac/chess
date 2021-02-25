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

// *** ROOK *** //
export const rook = ({ board, player, currentRow, currentCol }: Args) => {
  const squaresArr = [];
  const currRow = Number(currentRow);
  const currCol = Number(currentCol);

  // up
  for (let i = currRow - 1; i >= 0; i--) {
    if (board[i][currCol] !== null && board[i][currCol]?.[0] !== player) {
      squaresArr.push(`${i}-${currCol}`);
      break;
    }
    if (board[i][currCol] !== null) break;
    squaresArr.push(`${i}-${currCol}`);
  }
  // down
  for (let i = currRow + 1; i <= 7; i++) {
    if (board[i][currCol] !== null && board[i][currCol]?.[0] !== player) {
      squaresArr.push(`${i}-${currCol}`);
      break;
    }
    if (board[i][currCol] !== null) break;
    squaresArr.push(`${i}-${currCol}`);
  }
  // left
  for (let i = currCol - 1; i >= 0; i--) {
    if (board[currRow][i] !== null && board[currRow][i]?.[0] !== player) {
      squaresArr.push(`${currRow}-${i}`);
      break;
    }
    if (board[currRow][i] !== null) break;
    squaresArr.push(`${currRow}-${i}`);
  }
  // right
  for (let i = currCol + 1; i <= 7; i++) {
    if (board[currRow][i] !== null && board[currRow][i]?.[0] !== player) {
      squaresArr.push(`${currRow}-${i}`);
      break;
    }
    if (board[currRow][i] !== null) break;
    squaresArr.push(`${currRow}-${i}`);
  }

  return squaresArr;
};
