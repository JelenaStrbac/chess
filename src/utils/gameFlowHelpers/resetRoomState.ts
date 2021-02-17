import { RootState } from "../../types";

export const resetRoomState = (state: RootState["room"]) => {
  state.roomID = null;
  state.status = null;
  state.color = null;
  state.name = null;
};
