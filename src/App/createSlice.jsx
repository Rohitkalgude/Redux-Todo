import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("Todo")) || [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,

  reducers: {
    AddTodo: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem("Todo", JSON.stringify(state.value));
    },

    RemoveTodo: (state, action) => {
      state.value = state.value.filter(item => item.id !== action.payload);
      localStorage.setItem("Todo", JSON.stringify(state.value));
    },

    EditTodo: (state, action) => {
      const { id, text } = action.payload;
      const todoIndex = state.value.findIndex(item => item.id === id);
      if (todoIndex !== -1) {
        state.value[todoIndex].text = text;
        localStorage.setItem("Todo", JSON.stringify(state.value));
      }
    },
  },
});

export const { AddTodo, RemoveTodo, EditTodo } = todoSlice.actions;
export default todoSlice.reducer;
