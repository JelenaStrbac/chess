import movements from "../utils/movingFigures";

export const findAllMoves = (board, player, notation, pawnDiagonal) => {
  //const oppositePlayer = player === "W" ? "B" : "W";

  let allPossibleMoves = [];
  board.forEach((row, i) =>
    row.forEach((elem, j) => {
      if (elem !== null && elem?.[0] === player) {
        allPossibleMoves.push(
          ...movements[elem?.[1]](board, player, i, j, notation, pawnDiagonal)
        );
      }
    })
  );

  return [...new Set(allPossibleMoves)];
};
