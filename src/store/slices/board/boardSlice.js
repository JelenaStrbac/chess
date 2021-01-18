import { createSlice } from "@reduxjs/toolkit";
import checkField from "../../../utils/checkField";
import movingFigures from "../../../utils/movingFigures";
import writeNotation from "../../../utils/writeNotation";

export const initialState = {
  board: [
    ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
  ],
  activePlayer: "W",
  activePlayerStatus: "selecting",
  selectedField: "",
  current: {
    field: "",
    figure: "",
  },
  possibleMoves: [],
  notation: [],
  captured: {
    W: [],
    B: [],
  },
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // 1. reducer
    selectAndMoveFigure: {
      reducer(state, action) {
        const { currField, currFigure } = action.payload;
        const [currentRow, currentCol] = currField?.split("-");

        // touch-move rule not applied - player can determine to play with another figure
        if (
          state.current.field === currField &&
          state.current.figure === currFigure
        ) {
          state.activePlayerStatus = "selecting";
          state.selectedField = "";
          state.current.field = "";
          state.current.figure = "";
          state.possibleMoves = [];
        } else {
          // select the figure
          if (
            state.activePlayerStatus === "selecting" &&
            state.activePlayer === currFigure?.[0]
          ) {
            state.current.field = currField;
            state.current.figure = currFigure;
            state.selectedField = currField;
            state.activePlayerStatus = "moving";
            state.possibleMoves = movingFigures[currFigure?.[1]](
              state.board,
              state.activePlayer,
              currentRow,
              currentCol
            );
          }

          // move the figure on the desired square
          const [currRow, currCol] = state.current.field?.split("-");
          const [wanRow, wanCol] = currField?.split("-");

          if (
            state.activePlayerStatus === "moving" &&
            state.activePlayer === state.current.figure[0] &&
            checkField(state.board, state.activePlayer, wanRow, wanCol) &&
            movingFigures[state.current.figure[1]](
              state.board,
              state.activePlayer,
              currRow,
              currCol
            ).includes(currField)
          ) {
            let captured = "";
            if (state.board[wanRow][wanCol]) {
              captured = state.board[wanRow][wanCol];
              state.captured[state.activePlayer].push(
                state.board[wanRow][wanCol]
              );
            }
            state.selectedField = `${wanRow}-${wanCol}`;
            state.board[wanRow][wanCol] = state.current.figure;
            state.board[currRow][currCol] = null;
            state.possibleMoves = [];
            state.notation.push(
              writeNotation(
                state.current.figure,
                wanRow,
                wanCol,
                captured,
                currCol
              )
            );
            state.activePlayerStatus = "selecting";
            state.activePlayer = state.activePlayer === "W" ? "B" : "W";
          }
        }
      },
      prepare(currField, currFigure) {
        return {
          payload: { currField, currFigure },
        };
      },
    },
  },
});

export const { selectAndMoveFigure } = boardSlice.actions;

export default boardSlice.reducer;
