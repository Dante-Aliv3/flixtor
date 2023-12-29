import React from "react";
import { Route, Routes } from "react-router-dom";
import NowPlayingPage from "../pages/NowPlayingPage/index.tsx";
import MovieDetailsPage from "../pages/MovieDetailsPage/index.tsx";
import TvShowsPage from "../pages/TvShowsPage/index.tsx";
import TvDetailsPage from "../pages/TvDetailsPage/index.tsx";
import NotFound from "../pages/NotFound/index.tsx";
import MoviesPage from "../pages/MoviesPage/index.tsx";

const LayoutRoutes: React.FC = () => {
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
};

export default LayoutRoutes;
