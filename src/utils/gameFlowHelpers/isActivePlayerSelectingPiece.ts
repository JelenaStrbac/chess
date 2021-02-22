import { RootState } from "../../types";

export const isActivePlayerSelectingPiece = (
  state: RootState["game"],
  currFigure: string | null
) => state.activePlayer === currFigure?.[0];
