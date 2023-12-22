var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../../context/session";
export default function MoviesPage(props) {
    const { sessionData } = useContext(SessionContext);
    const [promoMovies, setPromoMovies] = useState({});
    const [popularMovies, setPopularMovies] = useState({});
    const fetchAPIData = (endpoint) => __awaiter(this, void 0, void 0, function* () {
        const API_KEY = sessionData.api.apiKey;
        const API_URL = sessionData.api.apiUrl;
        window.showSpinner();
        const response = yield fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
        const data = yield response.json();
        window.hideSpinner();
        return data;
    });
    useEffect(() => {
        //console.log(sessionData.api.apiKey);
        const init = () => __awaiter(this, void 0, void 0, function* () {
            //const {results: newMovies} = await fetchAPIData('movie/now_playing');
            //const {results: popularMovies} = await fetchAPIData('movie/popular');
            //const {results} = await fetchAPIData('movie/now_playing');
            //console.log(newMovies);
            const [newMoviesRes, popularMoviesRes] = yield Promise.all([
                fetchAPIData("movie/now_playing"),
                fetchAPIData("movie/popular"),
            ]);
            const { results: newMovies } = yield newMoviesRes;
            const { results: popularMovies } = yield popularMoviesRes;
            setPromoMovies(newMovies);
            setPopularMovies(popularMovies);
        });
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        //console.log(Object.keys(promoMovies).length);
        //console.log(promoMovies);
        /*Object.keys(promoMovies).length && promoMovies.map((card) => {
                console.log(card);
            });*/
    }, [promoMovies]);
    useEffect(() => {
        //console.log(Object.keys(popularMovies).length);
        //console.log(popularMovies);
        //console.log(popularMovies);
        /*Object.keys(popularMovies).length && popularMovies.map((card) => {
                console.log(card);
            });*/
    }, [popularMovies]);
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: "container", style: !sessionData.darkmode ? { background: 'white', maxWidth: 'none', padding: '0px', margin: '0px' } : null },
            React.createElement("h2", null, "Popular Movies"),
            React.createElement("div", { id: "popular-movies", className: "grid" }, Object.keys(popularMovies).length &&
                popularMovies.map((movie) => {
                    return (React.createElement("div", { className: "card" },
                        React.createElement(Link, { to: `/movie-details/${movie.id}` },
                            React.createElement("img", { src: movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : `../images/no-image.jpg`, className: "card-img-top", alt: `${movie.title}` })),
                        React.createElement("div", { className: "card-body" },
                            React.createElement("h5", { className: "card-title" }, movie.title),
                            React.createElement("p", { className: "card-text" },
                                React.createElement("small", { className: "text-muted" },
                                    "Release: ",
                                    movie.release_date)))));
                })))));
}
