import { findAllMovesAllFigures } from "./findAllMovesAllFigures";
import allMovingFiguresFns from "../figures/allMovingFiguresFns";
import { checkIfKingIsUnderCheckmate } from "./checkIfKingIsUnderCheckmate";
import { determineCurrentFigure } from "../gameFlowHelpers/determineCurrentFigure";

export const findPossibleMovesCurrFig = ({
  board,
  player,
  currFigure,
  currField,
  notation,
  startFields,
  isGameEnded,
  state,
}) => {
  const [currentRow, currentCol] = currField?.split("-");
  const figure = determineCurrentFigure(currFigure);

  // find all moves of opposite player
  const pawnSpecialMoves = true;
  const allPossibleMoves = findAllMovesAllFigures({
    board: board,
    player: player,
    notation: notation,
    pawnSpecialMoves: pawnSpecialMoves,
    startFields: startFields,
  });

  let possibleMovesCurrFig = [];

  // if figure is KING, it can move only on fields that not under attack of opposite figures
  if (figure === "K") {
    possibleMovesCurrFig = allMovingFiguresFns["K"]({
      board: board,
      player: player,
      currentRow: currentRow,
      currentCol: currentCol,
      notation: notation,
      startFields: startFields,
    }).filter((element) => !allPossibleMoves.includes(element));

    // KING in check => GAME END
    if (possibleMovesCurrFig.length === 0 && !isGameEnded) {
      state.end.isGameEnded = true;
      state.end.howIsGameEnded = "checkmate";
    }

    // if is OTHER figure => two possibilites:
  } else {
    //1) king is checkmated (no possible moves for other figures, only king can move if possible)
    if (checkIfKingIsUnderCheckmate(board, player, notation, startFields)) {
      possibleMovesCurrFig = [];
      //2) king is NOT checkmated (figure can move on its possible moves)
    } else {
      possibleMovesCurrFig = allMovingFiguresFns[figure]({
        board: board,
        player: player,
        currentRow: currentRow,
        currentCol: currentCol,
        notation: notation,
        startFields: startFields,
      })?.filter((el) => el !== "en passant" && el !== "pawn promotion");
    }
  }
  return possibleMovesCurrFig;
};
