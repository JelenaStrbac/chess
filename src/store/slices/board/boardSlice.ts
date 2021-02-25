import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { pawnSpecialMoves } from "../../../utils/figures/pawnSpecialMoves";
import { kingSpecialMoves } from "../../../utils/figures/kingSpecialMoves";
import { determineCurrentFigure } from "../../../utils/gameFlowHelpers/determineCurrentFigure";
import { determineRowAndCol } from "../../../utils/gameFlowHelpers/determineRowAndCol";
import { isPlayerClickingSameField } from "../../../utils/gameFlowHelpers/isPlayerClickingSameField";
import { isActivePlayerSelectingPiece } from "../../../utils/gameFlowHelpers/isActivePlayerSelectingPiece";
import { resettingStateToInitial } from "../../../utils/gameFlowHelpers/resettingStateToInitial";
import { resetStateForRematch } from "../../../utils/gameFlowHelpers/resetStateForRematch";
import { findPossibleMovesCurrFig } from "../../../utils/movesAndCheckmate/findPossibleMovesCurrFig";
import { writeNotation } from "../../../utils/gameFlowHelpers/writeNotation";
import { writeFieldFromWhichFigIsMoved } from "../../../utils/gameFlowHelpers/writeFieldFromWhichFigIsMoved";
import { RootState } from "../../../types";

export const initialState: RootState["game"] = {
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
  shouldPawnPromote: false,
  pawnPromotion: {
    W: "Q",
    B: "Q",
  },
  end: {
    isGameEnded: false,
    howIsGameEnded: "", // checkmate, resign
    winner: "",
    loser: "",
    isRematch: false,
  },
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    selectAndMoveFigure: {
      reducer(
        state,
        action: PayloadAction<{
          currFigure:
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
            | null;
          currField: string;
        }>
      ) {
        state.end.isRematch = false;

        const { currField, currFigure } = action.payload;

        // touch-move rule not applied - player select/deselect same field
        if (isPlayerClickingSameField(state, currField)) {
          resettingStateToInitial(state);

          // player selects the figure (1) and clicks on wanted field to place it (2):
        } else {
          // *** (1) selecting the figure ***
          if (
            state.activePlayerStatus === "selecting" &&
            isActivePlayerSelectingPiece(state, currFigure)
          ) {
            state.current.field = currField;
            state.current.figure = currFigure;
            state.activePlayerStatus = "moving";

            const [currRow, currCol] = determineRowAndCol(state.current.field);
            const figure = determineCurrentFigure(state.current.figure);
            const arrWithAllFieldsFromFigsAreMoved = writeFieldFromWhichFigIsMoved(
              figure,
              currRow,
              currCol
            );

            state.possibleMoves = findPossibleMovesCurrFig({
              board: state.board,
              player: state.activePlayer,
              currFigure: currFigure,
              currField: currField,
              notation: state.notation,
              startFields: arrWithAllFieldsFromFigsAreMoved,
              isGameEnded: state.end.isGameEnded,
              state,
            });

            if (currFigure === "WP" && currRow - 1 === 0) {
              state.shouldPawnPromote = true;
            }
            if (currFigure === "BP" && currRow + 1 === 7) {
              state.shouldPawnPromote = true;
            }
          }

          // *** (2) move the figure on the desired square ***
          const [currRow, currCol] = determineRowAndCol(state.current.field);
          const [wanRow, wanCol] = determineRowAndCol(currField);

          const figure = determineCurrentFigure(state.current.figure);
          const arrWithAllFieldsFromFigsAreMoved = writeFieldFromWhichFigIsMoved(
            figure,
            currRow,
            currCol
          );

          if (
            state.activePlayerStatus === "moving" &&
            state.possibleMoves.includes(currField)
          ) {
            const specialMovesArgObj = {
              state: state,
              board: state.board,
              player: state.activePlayer,
              currentRow: currRow,
              currentCol: currCol,
              wanRow,
              wanCol,
              notation: state.notation,
              startFields: arrWithAllFieldsFromFigsAreMoved,
            };
            // special king move (castling)
            if (figure === "K") {
              kingSpecialMoves(specialMovesArgObj);
            }
            // special pawn moves
            if (figure === "P") {
              pawnSpecialMoves(specialMovesArgObj);
            }
            // adding captured figures
            let captured;
            if (state.board[wanRow][wanCol]) {
              captured = state.board[wanRow][wanCol];
              if (captured) {
                state.captured[state.activePlayer].push(captured);
              }
              state.captured[state.activePlayer] = state.captured[
                state.activePlayer
              ].filter((el) => el !== null);
            }
            // write notation
            state.notation.push(
              writeNotation({
                figure: figure,
                r: Number(wanRow),
                c: Number(wanCol),
                captured: captured,
                prevCol: currCol,
              })
            );
            if (state.current.figure !== "") {
              state.board[wanRow][wanCol] = state.current.figure;
            }
            state.board[currRow][currCol] = null;
            state.possibleMoves = [];
            state.activePlayerStatus = "selecting";
            state.activePlayer = state.activePlayer === "W" ? "B" : "W";
            state.current.field = "";
            state.shouldPawnPromote = false;
          }
        }
      },
      prepare(payload: {
        currFigure:
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
          | null;
        currField: string;
      }) {
        return {
          payload,
        };
      },
    },
    promotePawnTo(state, action: PayloadAction<"B" | "Q" | "R" | "N">) {
      state.pawnPromotion[state.activePlayer] = action.payload;
    },
    gameEnd: {
      reducer(
        state,
        action: PayloadAction<{
          howIsGameEnded: "" | "checkmate" | "resign";
          winner: string;
          loser: string;
        }>
      ) {
        const { howIsGameEnded, winner, loser } = action.payload;
        if (!state.end.isGameEnded) {
          state.end.isGameEnded = true;
          state.end.howIsGameEnded = howIsGameEnded;
          state.end.winner = winner;
          state.end.loser = loser;
        }
      },
      prepare(payload: {
        howIsGameEnded: "" | "checkmate" | "resign";
        winner: string;
        loser: string;
      }) {
        return {
          payload,
        };
      },
    },
    rematch(state) {
      resetStateForRematch(state);
    },
    resetGame(state) {
      resetStateForRematch(state);
    },
    addUpdatedGame(state, action: PayloadAction<RootState["game"]>) {
      if (action.payload) {
        state.board = action.payload.board;
        state.activePlayer = action.payload.activePlayer;
        state.activePlayerStatus = action.payload.activePlayerStatus;
        state.current.field = action.payload.current.field;
        state.current.figure = action.payload.current.figure;
        state.possibleMoves = action.payload.possibleMoves;
        state.notation = action.payload.notation;
        state.captured["W"] = action.payload.captured["W"];
        state.captured["B"] = action.payload.captured["B"];
        state.shouldPawnPromote = action.payload.shouldPawnPromote;
        state.pawnPromotion["W"] = action.payload.pawnPromotion["W"];
        state.pawnPromotion["B"] = action.payload.pawnPromotion["B"];
        state.end.isGameEnded = action.payload.end.isGameEnded;
        state.end.howIsGameEnded = action.payload.end.howIsGameEnded;
        state.end.winner = action.payload.end.winner;
        state.end.loser = action.payload.end.loser;
        state.end.isRematch = action.payload.end.isRematch;
      }
    },
  },
});

export const {
  selectAndMoveFigure,
  promotePawnTo,
  gameEnd,
  rematch,
  resetGame,
  addUpdatedGame,
} = boardSlice.actions;

export default boardSlice.reducer;
