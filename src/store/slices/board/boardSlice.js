import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  board: [
    ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
  },
});

export const { increment, decrement } = boardSlice.actions;

export default boardSlice.reducer;

// const boardSlice = createSlice({
//   name: "board",
//   initialState,
//   reducers: {
//     // addTodo(state, action) {
//     //   const { id, text } = action.payload;
//     //   state.push({ id, text, completed: false });
//     // },
//     // toggleTodo(state, action) {
//     //   const todo = state.find((todo) => todo.id === action.payload);
//     //   if (todo) {
//     //     todo.completed = !todo.completed;
//     //   }
//     // },
//   },
// });

//export const { addTodo, toggleTodo } = boardSlice.actions;
