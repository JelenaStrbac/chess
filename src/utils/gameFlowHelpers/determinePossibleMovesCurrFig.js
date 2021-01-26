import { findAllMoves } from "../findAllMoves";
import movingFigures from "../movingFigures";
import { checkIfKingIsUnderCheckmate } from "./checkIfKingIsUnderCheckmate";
import { determineCurrentFigure } from "./determineCurrentFigure";

export const determinePossibleMovesCurrFig = ({
  board,
  player,
  currFigure,
  currField,
  notation,
}) => {
  const [currentRow, currentCol] = currField?.split("-");
  // find all moves of opposite player
  const pawnSpecialMoves = true;
  const allPossibleMoves = findAllMoves(
    board,
    player,
    notation,
    pawnSpecialMoves
  );

  let possibleMovesCurrFig = [];

  // if figure is KING, it can move only on fields that not under attack of opposite figures
  if (determineCurrentFigure(currFigure) === "K") {
    possibleMovesCurrFig = movingFigures["K"](
      board,
      player,
      currentRow,
      currentCol
    ).filter((element) => !allPossibleMoves.includes(element));
    // if is OTHER figure => two possibilites:
  } else {
    //1) king is checkmated (no possible moves for other figures, only king can move if possible)
    if (checkIfKingIsUnderCheckmate(board, player, notation)) {
      possibleMovesCurrFig = [];
      //2) king is NOT checkmated (figure can move on its possible moves)
    } else {
      possibleMovesCurrFig = movingFigures[determineCurrentFigure(currFigure)](
        board,
        player,
        currentRow,
        currentCol,
        notation
      )?.filter((el) => el !== "en passant" && el !== "pawn promotion");
    }
  }
  return possibleMovesCurrFig;
};
