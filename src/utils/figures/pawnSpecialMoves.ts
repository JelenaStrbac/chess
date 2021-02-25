import { RootState } from "../../types";
import { pawn } from "./pawn";

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
  notation: string[];
  pawnDiagonal?: boolean;
  startFields: string[];
};

export const pawnSpecialMoves = ({
  state,
  board,
  player,
  currentRow,
  currentCol,
  wanRow,
  wanCol,
  notation,
  startFields,
}: Args) => {
  const movingFigureArray = pawn({
    board,
    player,
    currentRow,
    currentCol,
    notation,
    startFields,
  });

  // en passant
  if (movingFigureArray.includes("en passant")) {
    const numForEnPassantMoving = player === "W" ? 1 : -1;

    const enPassantField = state.board[wanRow + numForEnPassantMoving][wanCol];
    if (enPassantField !== null) {
      state.captured[player].push(enPassantField);
    }
    state.board[wanRow + numForEnPassantMoving][wanCol] = null;
  }
  // pawn promotion
  const movingFigureArrayTwo = pawn({
    board,
    player,
    currentRow: wanRow,
    currentCol: wanCol,
    notation,
    startFields,
  });
  if (movingFigureArrayTwo.includes("pawn promotion")) {
    const fig:
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
      | "WR" = `${player}${state.pawnPromotion[player]}` as const;
    state.current.figure = fig;
  }
};
