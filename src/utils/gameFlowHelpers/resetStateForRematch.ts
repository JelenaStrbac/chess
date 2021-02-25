import { RootState } from "../../types";

export const resetStateForRematch = (state: RootState["game"]) => {
  state.board = [
    ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
  ];
  state.activePlayer = "W";
  state.activePlayerStatus = "selecting";
  state.current = {
    field: "",
    figure: "",
  };
  state.possibleMoves = [];
  state.notation = [];
  state.captured = {
    W: [],
    B: [],
  };
  state.pawnPromotion = {
    W: "Q",
    B: "Q",
  };
  state.end = {
    isGameEnded: false,
    howIsGameEnded: "", // checkmate, resign
    winner: "",
    loser: "",
    isRematch: true,
  };
};
