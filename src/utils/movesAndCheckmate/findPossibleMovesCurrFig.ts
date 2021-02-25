import { findAllMovesAllFigures } from "./findAllMovesAllFigures";
import allMovingFiguresFns from "../figures/allMovingFiguresFns";
import { checkIfKingIsUnderCheckmate } from "./checkIfKingIsUnderCheckmate";
import { determineCurrentFigure } from "../gameFlowHelpers/determineCurrentFigure";
import { RootState } from "../../types";

type Args = {
  board: (
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
    | null
  )[][];
  player: "W" | "B";
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
  notation: string[];
  startFields: string[];
  isGameEnded: boolean;
  state: RootState["game"];
};

export const findPossibleMovesCurrFig = ({
  board,
  player,
  currFigure,
  currField,
  notation,
  startFields,
  isGameEnded,
  state,
}: Args) => {
  const [currentRow, currentCol] = currField
    ?.split("-")
    .map((el) => Number(el));
  const figure = determineCurrentFigure(currFigure);

  // find all moves of opposite player
  //const pawnSpecialMoves = true;
  const allPossibleMoves = findAllMovesAllFigures({
    board: board,
    player: player,
    notation: notation,
    //pawnSpecialMoves: pawnSpecialMoves,
    startFields: startFields,
  });

  let possibleMovesCurrFig = [];

  // if figure is KING, it can move only on fields that not under attack of opposite figures
  if (figure === "K") {
    const newBoard: Args["board"] = JSON.parse(JSON.stringify(board));
    newBoard[currentRow][currentCol] = null;

    const movesOfCurrFigureArray = allMovingFiguresFns["K"]({
      board: board,
      player: player,
      currentRow: currentRow,
      currentCol: currentCol,
      notation: notation,
      startFields: startFields,
    }).filter((element) => !allPossibleMoves.includes(element));

    const movesArray: string[] = [];
    movesOfCurrFigureArray.forEach((el) => {
      const [row, col] = el?.split("-").map((el) => Number(el));

      const updatedBoard: Args["board"] = [];
      newBoard.forEach((elem) => updatedBoard.push([...elem]));
      updatedBoard[row][col] = currFigure;

      if (
        !checkIfKingIsUnderCheckmate({
          board: updatedBoard,
          player,
          notation,
          startFields,
        })
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
    const newBoard: Args["board"] = JSON.parse(JSON.stringify(board));
    newBoard[currentRow][currentCol] = null;

    const movesOfCurrFigureArray = allMovingFiguresFns[
      figure as keyof typeof allMovingFiguresFns
    ]({
      board: board,
      player: player,
      currentRow: currentRow,
      currentCol: currentCol,
      notation: notation,
      startFields: startFields,
    })?.filter((el) => el !== "en passant" && el !== "pawn promotion");

    const movesArray: string[] = [];
    movesOfCurrFigureArray.forEach((el) => {
      const [row, col] = el?.split("-").map((el) => Number(el));

      const updatedBoard: Args["board"] = [];
      newBoard.forEach((elem) => updatedBoard.push([...elem]));
      updatedBoard[row][col] = currFigure;

      if (
        !checkIfKingIsUnderCheckmate({
          board: updatedBoard,
          player,
          notation,
          startFields,
        })
      ) {
        movesArray.push(el);
      }
    });
    possibleMovesCurrFig = movesArray;
  }
  return possibleMovesCurrFig;
};
