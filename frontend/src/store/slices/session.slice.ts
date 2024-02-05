import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { moviesSlice } from "./movies.slice.ts";

export type sessionDataType = {
  api: { apiKey: string; apiUrl: string };
  darkmode: boolean;
  [key: string]: any;
};

const getInitialState = (): sessionDataType => {
  let selectedOption = sessionStorage.getItem("darkmode") || true;
  if (typeof selectedOption !== "boolean") {
    selectedOption = selectedOption === "true";
  }

  return {
    currentPage: window.location.pathname,
    search: {
      term: "",
      type: "",
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
    api: {
      apiKey: "db1a3d4fc9949395b6300a619305310d",
      apiUrl: "https://api.themoviedb.org/3/",
    },
    darkmode: selectedOption,
  };
};

const initialState: sessionDataType = getInitialState();
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<[]>) => {
      //console.log("action:", action);
      // console.log("state:", current(state));
      return { ...state, darkmode: !state.darkmode };
    },
  },
});
export const { toggleDarkMode } = sessionSlice.actions;
export default sessionSlice.reducer;
