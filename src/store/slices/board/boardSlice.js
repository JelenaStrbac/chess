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
  pawnPromotion: {
    W: "Q",
    B: "Q",
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
          // *** select the figure ***
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
              currentCol,
              state.notation
            ).filter((el) => el !== "en passant" && el !== "pawn promotion");
          }

          // *** move the figure on the desired square ***
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
              currCol,
              state.notation
            ).includes(currField)
          ) {
            // adding captured figures
            let captured = "";
            if (state.board[wanRow][wanCol]) {
              captured = state.board[wanRow][wanCol];
              state.captured[state.activePlayer].push(
                state.board[wanRow][wanCol]
              );
            }
            state.selectedField = `${wanRow}-${wanCol}`;
            state.board[wanRow][wanCol] = state.current.figure;
            // checking for en passant move only for pawn
            if (
              state.current.figure?.[1] === "P" &&
              movingFigures[state.current.figure[1]](
                state.board,
                state.activePlayer,
                currRow,
                currCol,
                state.notation
              ).includes("en passant")
            ) {
              const numForEnPassantMoving = state.activePlayer === "W" ? 1 : -1;
              state.captured[state.activePlayer].push(
                state.board[Number(wanRow) + numForEnPassantMoving][wanCol]
              );
              state.board[Number(wanRow) + numForEnPassantMoving][
                wanCol
              ] = null;
              state.board[currRow][currCol] = null;
            } else {
              state.board[currRow][currCol] = null;
            }
            // check for pawn promotion
            if (
              state.current.figure?.[1] === "P" &&
              movingFigures[state.current.figure[1]](
                state.board,
                state.activePlayer,
                currRow,
                currCol,
                state.notation
              ).includes("pawn promotion")
            ) {
              state.board[currRow][currCol] = `${state.activePlayer}${
                state.pawnPromotion[state.activePlayer]
              }`;
            }
            // continue reseting when figure is moved
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
    promotePawnTo(state, action) {
      debugger;
      state.pawnPromotion[state.activePlayer] = action.payload;
    },
  },
});

export const { selectAndMoveFigure, promotePawnTo } = boardSlice.actions;

export default boardSlice.reducer;
