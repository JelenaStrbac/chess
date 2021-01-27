import { createSlice } from "@reduxjs/toolkit";

import { pawnSpecialMoves } from "../../../utils/figures/pawnSpecialMoves";
import { kingSpecialMoves } from "../../../utils/figures/kingSpecialMoves";
import { determineCurrentFigure } from "../../../utils/gameFlowHelpers/determineCurrentFigure";
import { isPlayerClickingSameField } from "../../../utils/gameFlowHelpers/isPlayerClickingSameField";
import { isActivePlayerSelectingPiece } from "../../../utils/gameFlowHelpers/isActivePlayerSelectingPiece";
import { resettingStateToInitial } from "../../../utils/gameFlowHelpers/resettingStateToInitial";
import { findPossibleMovesCurrFig } from "../../../utils/movesAndCheckmate/findPossibleMovesCurrFig";
import { writeNotation } from "../../../utils/gameFlowHelpers/writeNotation";
import { writeFieldFromWhichFigIsMoved } from "../../../utils/gameFlowHelpers/writeFieldFromWhichFigIsMoved";

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
    selectAndMoveFigure: {
      reducer(state, action) {
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

            const [currRow, currCol] = state.current.field?.split("-");
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
            });
          }

          // *** (2) move the figure on the desired square ***
          const [currRow, currCol] = state.current.field
            ?.split("-")
            .map((el) => Number(el));
          const [wanRow, wanCol] = currField
            ?.split("-")
            .map((el) => Number(el));
          const figure = determineCurrentFigure(state.current.figure);

          if (
            state.activePlayerStatus === "moving" &&
            state.possibleMoves.includes(currField)
          ) {
            const specialMovesArgObj = {
              state: state,
              board: state.board,
              player: state.activePlayer,
              currRow: Number(currRow),
              currCol: Number(currCol),
              wanRow: Number(wanRow),
              wanCol: Number(wanCol),
              notation: state.notation,
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
            let captured = "";
            if (state.board[wanRow][wanCol]) {
              captured = state.board[wanRow][wanCol];
              state.captured[state.activePlayer].push(captured);
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
            state.board[wanRow][wanCol] = state.current.figure;
            state.board[currRow][currCol] = null;
            state.possibleMoves = [];
            state.activePlayerStatus = "selecting";
            state.activePlayer = state.activePlayer === "W" ? "B" : "W";
            state.current.field = "";
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
