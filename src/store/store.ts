import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import boardReducer from "./slices/board/boardSlice";
import roomsReducer from "./slices/rooms/roomsSlice";

const store = configureStore({
  reducer: {
    game: boardReducer,
    room: roomsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
