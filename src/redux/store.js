import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice.js";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
