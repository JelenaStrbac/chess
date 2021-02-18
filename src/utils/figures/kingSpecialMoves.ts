import { RootState } from "../../types";

type Args = {
  state: RootState["game"];
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
  wanRow: number;
  wanCol: number;
};

export const kingSpecialMoves = ({
  state,
  board,
  player,
  currentRow,
  currentCol,
  wanRow,
  wanCol,
}: Args) => {
  // *** castling ***

  if (player === "W") {
    // queen-side 0-0-0
    if (currentRow === 7 && currentCol === 4 && wanRow === 7 && wanCol === 0) {
      board[7][2] = "WK";
      board[7][3] = "WR";
      board[7][0] = null;
      state.current.figure = "";
    }
    // kingside 0-0
    if (currentRow === 7 && currentCol === 4 && wanRow === 7 && wanCol === 7) {
      board[7][6] = "WK";
      board[7][5] = "WR";
      board[7][7] = null;
      state.current.figure = "";
    }
  } else if (player === "B") {
    // queen-side 0-0-0
    if (currentRow === 0 && currentCol === 4 && wanRow === 0 && wanCol === 0) {
      board[0][2] = "BK";
      board[0][3] = "BR";
      board[0][0] = null;
      state.current.figure = "";
    }
    // kingside 0-0
    if (currentRow === 0 && currentCol === 4 && wanRow === 0 && wanCol === 7) {
      board[0][6] = "BK";
      board[0][5] = "BR";
      board[0][7] = null;
      state.current.figure = "";
    }
  }
};
