import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

export const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {
    updateTvShows: (state, action: PayloadAction<[]>) => {
      //console.log("action:", action);
      // console.log("state:", current(state));
      return action.payload;
    },
  },
});
export const { updateTvShows } = tvShowsSlice.actions;
export default tvShowsSlice.reducer;
