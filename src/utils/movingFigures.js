const movements = {
  P: (player, currRow, currCol) => {
    let squaresArr = [];

    if (player === "W") {
      // moving 1 field in front
      squaresArr.push(`${Number(currRow) - 1}-${Number(currCol)}`);

      // moving pawn for the first time - allowed to move one or two fields in front
      if (currRow === "6")
        squaresArr.push(`${Number(currRow) - 2}-${Number(currCol)}`);
    } else {
      squaresArr.push(`${Number(currRow) + 1}-${Number(currCol)}`);
      if (currRow === "1")
        squaresArr.push(`${Number(currRow) + 2}-${Number(currCol)}`);
    }
    return squaresArr;
  },
};

export default movements;
