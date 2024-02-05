import { configureStore } from "@reduxjs/toolkit";
import sessionSliceReducer from "./slices/session.slice.ts";
import tvShowsSliceReducer from "./slices/tvShows.slice.ts";
import moviesSliceReducer from "./slices/movies.slice.ts";

import { createLogger } from "redux-logger";
import { tvShowsSlice } from "./slices/tvShows.slice.ts";

export const store = configureStore({
  reducer: {
    tvshows: tvShowsSliceReducer,
    movies: moviesSliceReducer,
    session: sessionSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
