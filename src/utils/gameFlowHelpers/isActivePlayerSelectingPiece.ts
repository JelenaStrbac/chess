import { RootState } from "../../types";

export const isActivePlayerSelectingPiece = (state: RootState["game"], currFigure: string) =>
  state.activePlayer === currFigure?.[0];
