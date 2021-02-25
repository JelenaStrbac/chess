import { RootState } from "../../types";

export const isPlayerClickingSameField = (state: RootState["game"], currField: string) => {
  return state.current.field === currField;
};
