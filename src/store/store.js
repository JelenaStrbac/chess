import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/board/boardSlice";

const store = configureStore({
  reducer: {
    // ovde upisati nazive reducer-a (levo je naziv koji ce nam biti u state-u i u ReduxDevTools-u)
    game: boardReducer,
  },
});

export default store;
