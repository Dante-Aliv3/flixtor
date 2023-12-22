var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../../context/session";
export default function TvShowsContainer(props) {
    const { sessionData, setSessionData } = useContext(SessionContext);
    const [tvShows, settvShows] = useState({});
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
            const { results: newtvShows } = yield fetchAPIData("tv/popular");
            //console.log(newtvShows);
            settvShows(newtvShows);
        });
        init();
        //setSessionData({...sessionData, darkmode: false});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        //console.log(Object.keys(tvShows).length);
        //console.log(tvShows);
        /*Object.keys(tvShows).length && tvShows.map((card) => {
                console.log(card);
            });*/
    }, [tvShows]);
    return (React.createElement(Fragment, null,
        React.createElement("section", { className: "container", style: !sessionData.darkmode ? { background: 'white', color: 'black', maxWidth: 'none', padding: '0px', margin: '0px' } : null },
            React.createElement("h2", null, "Popular TV Shows"),
            React.createElement("div", { id: "popular-shows", className: "grid" }, Object.keys(tvShows).length &&
                tvShows.map((show) => {
                    return (React.createElement("div", { className: "card" },
                        React.createElement(Link, { to: `/tv-details/${show.id}` },
                            React.createElement("img", { src: `https://image.tmdb.org/t/p/w500${show.poster_path}`, alt: `${show.title}` })),
                        React.createElement("h4", { className: "card-body" },
                            React.createElement("h5", { className: "card-title" }, show.name),
                            React.createElement("p", { className: "card-text" },
                                React.createElement("small", { className: "text-muted" },
                                    "Air Date: ",
                                    show.first_air_date)))));
                })))));
}
