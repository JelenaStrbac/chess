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
  pawnDiagonal?: boolean;
  startFields: string[];
};

// *** PAWN *** //
export const pawn = ({
  board,
  player,
  currentRow,
  currentCol,
  notation,
  pawnDiagonal,
  startFields,
}: Args) => {
  let squaresArr = [];
  const currRow = Number(currentRow);
  const currCol = Number(currentCol);

  // WHITE
  if (player === "W") {
    // pawn promotion
    if (currRow === 0) {
      squaresArr.push("pawn promotion");
    }

    // moving 1 field in front if that field is empty
    if (currRow - 1 >= 0 && board?.[currRow - 1][currCol] === null) {
      squaresArr.push(`${currRow - 1}-${currCol}`);
    }

    // capturing black on diagonal
    if (
      board?.[currRow - 1]?.[currCol + 1]?.[0] === "B" &&
      currRow - 1 >= 0 &&
      currCol + 1 <= 7
    )
      squaresArr.push(`${currRow - 1}-${currCol + 1}`);
    if (
      board?.[currRow - 1]?.[currCol - 1]?.[0] === "B" &&
      currRow - 1 >= 0 &&
      currCol - 1 >= 0
    )
      squaresArr.push(`${currRow - 1}-${currCol - 1}`);

    // capturing pawnDiagonal - only to check KINGs moves and checkmate
    if (
      pawnDiagonal &&
      currRow - 1 >= 0 &&
      currCol - 1 >= 0 &&
      currCol + 1 <= 7
    ) {
      squaresArr.push(`${currRow - 1}-${currCol + 1}`);
      squaresArr.push(`${currRow - 1}-${currCol - 1}`);
    }
    // en passant
    const lastMoveRow = notation?.[notation.length - 1]?.[1];
    if (
      currRow === 3 &&
      !startFields.includes(`P-2${currCol + 1}`) &&
      board[3]?.[currCol + 1] === "BP" &&
      Number(lastMoveRow) === 5
    ) {
      squaresArr.push(`${currRow - 1}-${currCol + 1}`);
      squaresArr.push("en passant");
    }
    if (
      currRow === 3 &&
      !startFields.includes(`P-2${currCol - 1}`) &&
      board[3]?.[currCol - 1] === "BP" &&
      Number(lastMoveRow) === 5
    ) {
      squaresArr.push(`${currRow - 1}-${currCol - 1}`);
      squaresArr.push("en passant");
    }

    // moving pawn for the first time - allowed to move one or two fields in front if both fields are empty
    if (
      currRow === 6 &&
      board[5][currCol] === null &&
      board[4][currCol] === null &&
      !pawnDiagonal
    )
      squaresArr.push(`${currRow - 2}-${currCol}`);
  } else {
    // BLACK

    // pawn promotion
    if (currRow === 7) {
      squaresArr.push("pawn promotion");
    }

    // moving pawn for the first time - allowed to move one or two fields in front if both fields are empty
    if (
      currRow === 1 &&
      board[2][currCol] === null &&
      board[3][currCol] === null &&
      !pawnDiagonal
    ) {
      squaresArr.push(`${currRow + 2}-${currCol}`);
    }

    // moving 1 field in front if that field is empty
    if (currRow + 1 <= 7 && board?.[currRow + 1]?.[currCol] === null) {
      squaresArr.push(`${currRow + 1}-${currCol}`);
    }

    // capturing white on diagonal
    if (
      board?.[currRow + 1]?.[currCol - 1]?.[0] === "W" &&
      currRow + 1 <= 7 &&
      currCol - 1 >= 0
    )
      squaresArr.push(`${currRow + 1}-${currCol - 1}`);
    if (
      board?.[currRow + 1]?.[currCol + 1]?.[0] === "W" &&
      currRow + 1 <= 7 &&
      currCol + 1 <= 7
    )
      squaresArr.push(`${currRow + 1}-${currCol + 1}`);

    // capturing pawnDiagonal - only to check KINGs moves and checkmate
    if (
      pawnDiagonal &&
      currRow + 1 <= 7 &&
      currCol - 1 >= 0 &&
      currCol + 1 <= 7
    ) {
      squaresArr.push(`${currRow + 1}-${currCol - 1}`);
      squaresArr.push(`${currRow + 1}-${currCol + 1}`);
    }

    // en passant
    const lastMoveRow = notation?.[notation.length - 1]?.[1];
    if (
      currRow === 4 &&
      !startFields.includes(`P-5${currCol + 1}`) &&
      board[4]?.[currCol + 1] === "WP" &&
      Number(lastMoveRow) === 4
    ) {
      squaresArr.push(`${currRow + 1}-${currCol + 1}`);
      squaresArr.push("en passant");
    }
    if (
      currRow === 3 &&
      !startFields.includes(`P-5${currCol - 1}`) &&
      board[4]?.[currCol - 1] === "WP" &&
      Number(lastMoveRow) === 4
    ) {
      squaresArr.push(`${currRow + 1}-${currCol - 1}`);
      squaresArr.push("en passant");
    }
  }
  return squaresArr;
};
