import allMovingFiguresFns from "../figures/allMovingFiguresFns";

export const findAllMovesAllFigures = ({
  board,
  player,
  notation,
  pawnDiagonal,
  startFields,
}) => {
  const oppositePlayer = player === "W" ? "B" : "W";

  const allPossibleMoves = [];
  board.forEach((row, i) =>
    row.forEach((elem, j) => {
      if (elem !== null && elem?.[0] === oppositePlayer) {
        allPossibleMoves.push(
          ...allMovingFiguresFns[elem?.[1]]({
            board: board,
            player: oppositePlayer,
            currentRow: i,
            currentCol: j,
            notation: notation,
            pawnDiagonal: pawnDiagonal,
            startFields: startFields,
          })
        );
      }
    })
  );

  return [...new Set(allPossibleMoves)];
};
