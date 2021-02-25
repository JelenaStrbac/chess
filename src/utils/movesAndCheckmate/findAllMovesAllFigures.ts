import allMovingFiguresFns from "../figures/allMovingFiguresFns";

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
  notation: string[];
  startFields: string[];
  pawnDiagonal?: boolean;
};

export const findAllMovesAllFigures = ({
  board,
  player,
  notation,
  pawnDiagonal,
  startFields,
}: Args) => {
  const oppositePlayer = player === "W" ? "B" : "W";

  const allPossibleMoves: string[] = [];
  board.forEach((row, i) =>
    row.forEach((elem, j) => {
      if (elem !== null && elem?.[0] === oppositePlayer) {
        allPossibleMoves.push(
          ...allMovingFiguresFns[elem[1] as keyof typeof allMovingFiguresFns]({
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
  // const allPossibleMoves: string[] = [];
  // board.forEach((row, i) =>
  //   row.forEach((elem, j) => {
  //     if (
  //       elem !== null &&
  //       elem?.[0] === oppositePlayer &&
  //       elem?.[1] === ("P" || "B" || "R" || "N" || "K" || "Q")
  //     ) {
  //       allPossibleMoves.push(
  //         ...allMovingFiguresFns[elem?.[1]]({
  //           board: board,
  //           player: oppositePlayer,
  //           currentRow: i,
  //           currentCol: j,
  //           notation: notation,
  //           pawnDiagonal: pawnDiagonal,
  //           startFields: startFields,
  //         })
  //       );
  //     }
  //   })
  // );

  // const allPossibleMoves = [];
  // board.forEach((row, i) =>
  //   row.forEach((elem, j) => {
  //     if (elem !== null && elem?.[0] === oppositePlayer) {
  //       allPossibleMoves.push(
  //         ...allMovingFiguresFns[elem?.[1]]({
  //           board: board,
  //           player: oppositePlayer,
  //           currentRow: i,
  //           currentCol: j,
  //           notation: notation,
  //           pawnDiagonal: pawnDiagonal,
  //           startFields: startFields,
  //         })
  //       );
  //     }
  //   })
  // );

  return Array.from(new Set(allPossibleMoves));
};
