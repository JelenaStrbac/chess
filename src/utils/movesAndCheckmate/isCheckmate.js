export const isCheckmate = (board, player, allPossibleMoves) => {
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
