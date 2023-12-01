import React from "react";
import { Route, Routes } from "react-router-dom";
import NowPlayingPage from "../pages/NowPlayingPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import TvShowsPage from "../pages/TvShowsPage";
import TvDetailsPage from "../pages/TvDetailsPage";
import NotFound from "../pages/NotFound";
import MoviesPage from "../pages/MoviesPage";

export default function LayoutRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<NowPlayingPage />}></Route>
        <Route
          path="/movie-details/:movieId"
          element={<MovieDetailsPage />}
        ></Route>
        <Route path="/movies" element={<MoviesPage />}></Route>
        <Route path="/shows" element={<TvShowsPage />}></Route>
        <Route path="/tv-details/:tvId" element={<TvDetailsPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
