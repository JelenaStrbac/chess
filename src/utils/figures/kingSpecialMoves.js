export const kingSpecialMoves = ({
  state,
  board,
  player,
  currRow,
  currCol,
  wanRow,
  wanCol,
  notation,
}) => {
  // *** castling ***

  if (player === "W") {
    // queenside 0-0-0
    if (currRow === 7 && currCol === 4 && wanRow === 7 && wanCol === 0) {
      board[7][2] = "WK";
      board[7][3] = "WR";
      board[7][0] = null;
      state.current.figure = null;
    }
    // kingside 0-0
    if (currRow === 7 && currCol === 4 && wanRow === 7 && wanCol === 7) {
      board[7][6] = "WK";
      board[7][5] = "WR";
      board[7][7] = null;
      state.current.figure = null;
    }
  } else if (player === "B") {
    // queenside 0-0-0
    if (currRow === 0 && currCol === 4 && wanRow === 0 && wanCol === 0) {
      board[0][2] = "BK";
      board[0][3] = "BR";
      board[0][0] = null;
      state.current.figure = null;
    }
    // kingside 0-0
    if (currRow === 0 && currCol === 4 && wanRow === 0 && wanCol === 7) {
      board[0][6] = "BK";
      board[0][5] = "BR";
      board[0][7] = null;
      state.current.figure = null;
    }
  }
};
