import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../../services/firebase";
import { generateRoomNum } from "../../../utils/createGameHelpers/generateRoomNum";

export const createRoom = createAsyncThunk(
  "rooms/saveNewRoom",
  async (name, store) => {
    const game = store.getState().game;
    const roomID = generateRoomNum();

    const room = {
      game,
      playerOne: name,
      status: "loading",
    };

    await database.ref("rooms/" + roomID).set(room);

    return roomID;
  }
);

export const joinRoom = createAsyncThunk(
  "rooms/joinToRoom",
  async ({ roomID, name }) => {
    const updates = {
      playerTwo: name,
      status: "started",
    };

    await database.ref("rooms/" + roomID).update(updates);

    return roomID;
  }
);

const initialState = {
  roomID: null,
  status: null,
};

const roomsSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    startGame(state, action) {
      state.status = "started";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        const roomID = action.payload;
        state.roomID = roomID;
        state.status = "loading";
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(joinRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        const roomID = action.payload;
        state.roomID = roomID;
        state.status = "started";
      })
      .addCase(joinRoom.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { startGame } = roomsSlice.actions;

export default roomsSlice.reducer;
