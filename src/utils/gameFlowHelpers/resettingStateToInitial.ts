import { RootState } from "../../types";

export const resettingStateToInitial = (state: RootState["game"]) => {
  state.activePlayerStatus = "selecting";
  state.current.field = "";
  state.current.figure = "";
  state.possibleMoves = [];
};
