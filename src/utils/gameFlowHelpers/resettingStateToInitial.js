export const resettingStateToInitial = (state) => {
  state.activePlayerStatus = "selecting";
  state.current.field = "";
  state.current.figure = "";
  state.possibleMoves = [];
};
