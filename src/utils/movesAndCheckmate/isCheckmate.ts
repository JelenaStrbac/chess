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
  allPossibleMoves: string[];
};

export const isCheckmate = ({ board, player, allPossibleMoves }: Args) => {
  let kingPosition = "";

  board.forEach((el, row) =>
    el.forEach((elem, col) => {
      if (elem === `${player}K`) {
        kingPosition = `${row}-${col}`;
      }
    })
  );

  return allPossibleMoves.includes(kingPosition);
};
