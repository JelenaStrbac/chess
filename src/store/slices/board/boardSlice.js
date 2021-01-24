import { createSlice } from "@reduxjs/toolkit";
import checkField from "../../../utils/checkField";
import { checkmate } from "../../../utils/checkmate";
import { findAllMoves } from "../../../utils/findAllMoves";
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
  checkmate: {
    W: false,
    B: false,
  },
  allPossibleMoves: {
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
    selectAndMoveFigure: {
      reducer(state, action) {
        const { currField, currFigure } = action.payload;
        const [currentRow, currentCol] = currField?.split("-");

        const oppositePlayer = state.activePlayer === "W" ? "B" : "W";

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
            // find all moves of opposite player
            let pawnDiagonal = true;
            state.allPossibleMoves[oppositePlayer] = findAllMoves(
              state.board,
              oppositePlayer,
              state.notation,
              pawnDiagonal
            );
            // check if active player KING is under checkmate
            state.checkmate[state.activePlayer] = checkmate(
              state.board,
              state.activePlayer,
              state.allPossibleMoves[oppositePlayer]
            );
            // determine the possible fields for selected figure only if king is not under checkmate (if yes, no possible moves - only king can move)
            if (
              state.checkmate[state.activePlayer] &&
              currFigure?.[1] !== "K"
            ) {
              state.possibleMoves = [];
            } else if (currFigure?.[1] === "K") {
              state.possibleMoves = movingFigures["K"](
                state.board,
                state.activePlayer,
                currentRow,
                currentCol
              ).filter(
                (element) =>
                  !state.allPossibleMoves[oppositePlayer].includes(element)
              );
            } else if (!state.checkmate[state.activePlayer]) {
              state.possibleMoves = movingFigures[currFigure?.[1]](
                state.board,
                state.activePlayer,
                currentRow,
                currentCol,
                state.notation
              )?.filter((el) => el !== "en passant" && el !== "pawn promotion");
            }
          }

          // *** move the figure on the desired square ***
          const [currRow, currCol] = state.current.field?.split("-");
          const [wanRow, wanCol] = currField?.split("-");

          if (
            state.activePlayerStatus === "moving" &&
            state.activePlayer === state.current.figure[0] &&
            checkField(state.board, state.activePlayer, wanRow, wanCol) &&
            state.possibleMoves.includes(currField)
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
      state.pawnPromotion[state.activePlayer] = action.payload;
    },
  },
});

export const { selectAndMoveFigure, promotePawnTo } = boardSlice.actions;

export default boardSlice.reducer;
