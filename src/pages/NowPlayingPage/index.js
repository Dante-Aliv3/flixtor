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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MoviesPage from "../../pages/MoviesPage";
import { SessionContext } from "../../context/session";
export default function NowPlayingPage(props) {
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
        React.createElement("section", { className: "now-playing", style: !sessionData.darkmode ? { background: 'white' } : null },
            React.createElement("h2", { style: !sessionData.darkmode ? { backgroundColor: 'black' } : null }, "Now Playing"),
            React.createElement("div", { className: "swiper" },
                React.createElement("div", { className: "swiper-wrapper" },
                    Object.keys(promoMovies).length &&
                        promoMovies.map((movie) => {
                            return (React.createElement("div", { className: "swiper-slide" },
                                React.createElement(Link, { to: `/movie-details/${movie.id}` },
                                    React.createElement("img", { src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, alt: `${movie.title}` })),
                                React.createElement("h4", { className: "swiper-rating" },
                                    React.createElement(FontAwesomeIcon, { icon: faStar, style: { color: "#f1c40f" } }),
                                    "\u00A0",
                                    movie.vote_average,
                                    " / 10")));
                        }),
                    Object.keys(promoMovies).length && window.initSwiper()))),
        React.createElement("section", { className: "search", style: !sessionData.darkmode ? { background: '#134e4a' } : null },
            React.createElement("div", { className: "container" },
                React.createElement("div", { id: "alert" }),
                React.createElement("form", { action: "/flixx-app/search.html", className: "search-form" },
                    React.createElement("div", { className: "search-radio" },
                        React.createElement("input", { type: "radio", id: "movie", name: "type", value: "movie", checked: false, onChange: () => { } }),
                        React.createElement("label", { htmlFor: "movies" }, "Movies"),
                        React.createElement("input", { type: "radio", id: "tv", name: "type", value: "tv" }),
                        React.createElement("label", { htmlFor: "shows" }, "TV Shows")),
                    React.createElement("div", { className: "search-flex" },
                        React.createElement("input", { type: "text", name: "search-term", id: "search-term", placeholder: "Enter search term" }),
                        React.createElement("button", { className: "btn", type: "submit" },
                            React.createElement("i", { className: "fas fa-search" })))))),
        React.createElement(MoviesPage, null)));
}
