import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../../services/firebaseDb";
import { generateRandomPlayerColor } from "../../../utils/createGameHelpers/generateRandomPlayerColor";
import { generateRoomNum } from "../../../utils/createGameHelpers/generateRoomNum";
import { resetRoomState } from "../../../utils/gameFlowHelpers/resetRoomState";

export const createRoom = createAsyncThunk(
  "rooms/saveNewRoom",
  async (name, store) => {
    const game = store.getState().game;
    const roomID = generateRoomNum();
    const playerColorOne = generateRandomPlayerColor();

    const room = {
      game,
      playerOne: {
        name,
        color: playerColorOne,
      },
      status: "loading",
    };

    await database.ref("rooms/" + roomID).set(room);

    return { roomID, name, playerColorOne };
  }
);

export const joinRoom = createAsyncThunk(
  "rooms/joinToRoom",
  async ({ roomID, name }) => {
    let playerColorOne;

    await database
      .ref("rooms/" + roomID + "/playerOne")
      .once("value")
      .then((snapshot) => {
        playerColorOne = snapshot.val().color;
      });

    const playerColorTwo = playerColorOne === "W" ? "B" : "W";

    const updates = {
      playerTwo: {
        name,
        color: playerColorTwo,
      },
      status: "started",
    };

    database.ref("rooms/" + roomID).update(updates);

    return { roomID, name, playerColorTwo };
  }
);

const initialState = {
  roomID: null,
  status: null,
  color: null,
  name: null,
};

const roomsSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    startGame(state) {
      state.status = "started";
    },
    resetRoom(state) {
      resetRoomState(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        const obj = action.payload;
        state.roomID = obj.roomID;
        state.name = obj.name;
        state.color = obj.playerColorOne;
        state.status = "loading";
      })
      .addCase(createRoom.rejected, (state) => {
        state.status = "error";
      })
      .addCase(joinRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        const obj = action.payload;
        state.roomID = obj.roomID;
        state.name = obj.name;
        state.color = obj.playerColorTwo;
        state.status = "started";
      })
      .addCase(joinRoom.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { startGame, resetRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
