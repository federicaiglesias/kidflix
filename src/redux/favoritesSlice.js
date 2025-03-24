import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const loadFavorites = createAsyncThunk(
  "favorites/load",
  async (userId) => {
    const docRef = doc(db, "favorites", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().movies : [];
  }
);

export const saveFavorites = createAsyncThunk(
  "favorites/save",
  async ({ userId, favorites }) => {
    const docRef = doc(db, "favorites", userId);
    await setDoc(docRef, { movies: favorites });
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { favorites: [], status: "idle" },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
