const movements = {
  P: (board, player, currentRow, currentCol, notation) => {
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

      // en passant
      const lastMoveRow = notation?.[notation.length - 1]?.[1];
      if (
        currRow === 3 &&
        board[3]?.[currCol + 1] === "BP" &&
        Number(lastMoveRow) === 5
      ) {
        squaresArr.push(`${currRow - 1}-${currCol + 1}`);
        squaresArr.push("en passant");
      }
      if (
        currRow === 3 &&
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
        board[4][currCol] === null
      )
        squaresArr.push(`${currRow - 2}-${currCol}`);

      // pawn promotion
      if (currRow === 0) {
        squaresArr.push("pawn promotion");
      }
    } else {
      // BLACK
      if (board[currRow + 1][currCol] === null)
        squaresArr.push(`${currRow + 1}-${currCol}`);

      if (board[currRow + 1][currCol - 1]?.[0] === "W")
        squaresArr.push(`${currRow + 1}-${currCol - 1}`);
      if (board[currRow + 1][currCol + 1]?.[0] === "W")
        squaresArr.push(`${currRow + 1}-${currCol + 1}`);

      const lastMoveRow = notation?.[notation.length - 1]?.[1];
      if (
        currRow === 4 &&
        board[4]?.[currCol + 1] === "WP" &&
        Number(lastMoveRow) === 4
      ) {
        squaresArr.push(`${currRow + 1}-${currCol + 1}`);
        squaresArr.push("en passant");
      }
      if (
        currRow === 3 &&
        board[4]?.[currCol - 1] === "WP" &&
        Number(lastMoveRow) === 4
      ) {
        squaresArr.push(`${currRow + 1}-${currCol - 1}`);
        squaresArr.push("en passant");
      }

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
