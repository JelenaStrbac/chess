import { createSlice } from "@reduxjs/toolkit";
import { pawnSpecialMoves } from "../../../utils/figures/pawnSpecialMoves";
import { determineCurrentFigure } from "../../../utils/gameFlowHelpers/determineCurrentFigure";
import { findPossibleMovesCurrFig } from "../../../utils/movesAndCheckmate/findPossibleMovesCurrFig";
import { isActivePlayerSelectingPiece } from "../../../utils/gameFlowHelpers/isActivePlayerSelectingPiece";
import { isPlayerClickingSameField } from "../../../utils/gameFlowHelpers/isPlayerClickingSameField";
import { resettingStateToInitial } from "../../../utils/gameFlowHelpers/resettingStateToInitial";
import { writeNotation } from "../../../utils/gameFlowHelpers/writeNotation";

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

            state.possibleMoves = findPossibleMovesCurrFig({
              board: state.board,
              player: state.activePlayer,
              currFigure: currFigure,
              currField: currField,
              notation: state.notation,
            });
          }

          // *** (2) move the figure on the desired square ***
          const [currRow, currCol] = state.current.field?.split("-");
          const [wanRow, wanCol] = currField?.split("-");

          if (
            state.activePlayerStatus === "moving" &&
            state.possibleMoves.includes(currField)
          ) {
            // adding captured figures
            let captured = "";
            if (state.board[wanRow][wanCol]) {
              captured = state.board[wanRow][wanCol];
              state.captured[state.activePlayer].push(captured);
            }
            // special pawn moves
            if (determineCurrentFigure(state.current.figure) === "P") {
              pawnSpecialMoves({
                state: state,
                board: state.board,
                player: state.activePlayer,
                currRow: currRow,
                currCol: currCol,
                wanRow: wanRow,
                wanCol: wanCol,
                notation: state.notation,
              });
            }
            // write notation
            state.notation.push(
              writeNotation({
                figure: determineCurrentFigure(state.current.figure),
                r: wanRow,
                c: wanCol,
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
