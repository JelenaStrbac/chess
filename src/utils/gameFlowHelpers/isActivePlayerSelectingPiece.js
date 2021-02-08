export const isActivePlayerSelectingPiece = (state, currFigure) =>
  state.activePlayer === currFigure?.[0];
