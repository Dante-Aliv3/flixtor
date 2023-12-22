import React from "react";
import { Route, Routes } from "react-router-dom";
import NowPlayingPage from "../pages/NowPlayingPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import TvShowsPage from "../pages/TvShowsPage";
import TvDetailsPage from "../pages/TvDetailsPage";
import NotFound from "../pages/NotFound";
import MoviesPage from "../pages/MoviesPage";
export default function LayoutRoutes() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Routes, null,
            React.createElement(Route, { index: true, element: React.createElement(NowPlayingPage, null) }),
            React.createElement(Route, { path: "/movie-details/:movieId", element: React.createElement(MovieDetailsPage, null) }),
            React.createElement(Route, { path: "/movies", element: React.createElement(MoviesPage, null) }),
            React.createElement(Route, { path: "/shows", element: React.createElement(TvShowsPage, null) }),
            React.createElement(Route, { path: "/tv-details/:tvId", element: React.createElement(TvDetailsPage, null) }),
            React.createElement(Route, { path: "*", element: React.createElement(NotFound, null) }))));
}
