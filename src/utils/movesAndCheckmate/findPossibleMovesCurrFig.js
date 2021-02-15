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
    const newBoard = [];
    board.forEach((el) => newBoard.push([...el]));
    newBoard[currentRow][currentCol] = null;

    const movesOfCurrFigureArray = allMovingFiguresFns["K"]({
      board: board,
      player: player,
      currentRow: currentRow,
      currentCol: currentCol,
      notation: notation,
      startFields: startFields,
    }).filter((element) => !allPossibleMoves.includes(element));

    const movesArray = [];
    movesOfCurrFigureArray.forEach((el) => {
      const [row, col] = el?.split("-");

      const updatedBoard = [];
      newBoard.forEach((elem) => updatedBoard.push([...elem]));
      updatedBoard[row][col] = currFigure;

      if (
        !checkIfKingIsUnderCheckmate(
          updatedBoard,
          player,
          notation,
          startFields
        )
      ) {
        movesArray.push(el);
      }
    });
    possibleMovesCurrFig = movesArray;

    // KING in check => GAME END
    if (possibleMovesCurrFig.length === 0 && !isGameEnded) {
      state.end.isGameEnded = true;
      state.end.howIsGameEnded = "checkmate";
      state.end.loser = player;
      state.end.winner = player === "W" ? "B" : "W";
    }

    // if is OTHER figure => two possibilities:
  } else {
    // if moving of that figure would cause king to be checkmated, figure does not have possible moves // else only moves that would protect king
    const newBoard = [];
    board.forEach((el) => newBoard.push([...el]));
    newBoard[currentRow][currentCol] = null;

    const movesOfCurrFigureArray = allMovingFiguresFns[figure]({
      board: board,
      player: player,
      currentRow: currentRow,
      currentCol: currentCol,
      notation: notation,
      startFields: startFields,
    })?.filter((el) => el !== "en passant" && el !== "pawn promotion");

    const movesArray = [];
    movesOfCurrFigureArray.forEach((el) => {
      const [row, col] = el?.split("-");

      const updatedBoard = [];
      newBoard.forEach((elem) => updatedBoard.push([...elem]));
      updatedBoard[row][col] = currFigure;

      if (
        !checkIfKingIsUnderCheckmate(
          updatedBoard,
          player,
          notation,
          startFields
        )
      ) {
        movesArray.push(el);
      }
    });
    possibleMovesCurrFig = movesArray;
  }
  return possibleMovesCurrFig;
};
