export const resettingStateToInitial = (state) => {
  state.activePlayerStatus = "selecting";
  state.selectedField = "";
  state.current.field = "";
  state.current.figure = "";
  state.possibleMoves = [];
};
