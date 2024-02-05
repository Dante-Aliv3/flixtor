import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateType {
  [key: string]: any;
}

const initialState: initialStateType = {
  promoMovies: [],
  popularMovies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updatePromoMovies: (state, action: PayloadAction<[]>) => {
      console.log("action:", action);
      return { ...state, promoMovies: action.payload };
    },
    updatePopularMovies: (state, action: PayloadAction<[]>) => {
      //console.log("action:", action);;
      return { ...state, popularMovies: action.payload };
    },
  },
});
export const { updatePromoMovies, updatePopularMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
