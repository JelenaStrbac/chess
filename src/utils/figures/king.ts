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
  notation: string[];
  startFields: string[];
};

// *** KING *** //
export const king = ({
  board,
  player,
  currentRow,
  currentCol,
  notation,
  startFields,
}: Args) => {
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

  // *** castling ***
  if (
    player === "W" &&
    !notation.some((el, i) => i % 2 === 0 && el[1] === "K")
  ) {
    // queen-side 0-0-0
    if (
      board[7][0] === "WR" &&
      board[7][1] === null &&
      board[7][2] === null &&
      board[7][3] === null &&
      !startFields.includes("R-70")
    ) {
      squaresArr.push(`${7}-${0}`);
    }
    // kingside 0-0
    if (
      board[7][7] === "WR" &&
      board[7][5] === null &&
      board[7][6] === null &&
      !startFields.includes("R-77")
    ) {
      squaresArr.push(`${7}-${7}`);
    }
  } else if (
    player === "B" &&
    !notation.some((el, i) => i % 2 !== 0 && el[1] === "K")
  ) {
    // queen-side 0-0-0
    if (
      board[0][0] === "BR" &&
      board[0][1] === null &&
      board[0][2] === null &&
      board[0][3] === null &&
      !startFields.includes("R-00")
    ) {
      squaresArr.push(`${0}-${0}`);
    }
    // kingside 0-0
    if (
      board[0][7] === "BR" &&
      board[0][5] === null &&
      board[0][6] === null &&
      !startFields.includes("R-07")
    ) {
      squaresArr.push(`${0}-${7}`);
    }
  }

  return squaresArr;
};
