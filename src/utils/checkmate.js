export const checkmate = (board, player, allPossibleMoves) => {
  let kingPosition = "";

  board.forEach((el, row) =>
    el.forEach((elem, col) => {
      if (elem === `${player}K`) {
        kingPosition = `${row}-${col}`;
      }
    })
  );

  //console.log(kingPosition);

  return allPossibleMoves.includes(kingPosition);
};
