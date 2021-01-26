import movingFigures from "../utils/movingFigures";

export const findAllMoves = (board, player, notation, pawnDiagonal) => {
  const oppositePlayer = player === "W" ? "B" : "W";

  const allPossibleMoves = [];
  board.forEach((row, i) =>
    row.forEach((elem, j) => {
      if (elem !== null && elem?.[0] === oppositePlayer) {
        allPossibleMoves.push(
          ...movingFigures[elem?.[1]](
            board,
            oppositePlayer,
            i,
            j,
            notation,
            pawnDiagonal
          )
        );
      }
    })
  );

  return [...new Set(allPossibleMoves)];
};
