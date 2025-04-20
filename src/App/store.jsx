import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./createSlice"

const store = configureStore({
    reducer : {
        todo : TodoReducer
    }
});

export default store;
