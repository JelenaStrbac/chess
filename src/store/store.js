import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/board/boardSlice";
import roomsReducer from "./slices/rooms/roomsSlice";

const store = configureStore({
  reducer: {
    game: boardReducer,
    room: roomsReducer,
  },
});

export default store;
