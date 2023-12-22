var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
export default function TvDetailsPage(props) {
    const [global, setGlobal] = useState({
        currentPage: window.location.pathname,
        search: {
            term: '',
            type: '',
            page: 1,
            totalPages: 1,
            totalResults: 0,
        },
        api: {
            apiKey: 'db1a3d4fc9949395b6300a619305310d',
            apiUrl: 'https://api.themoviedb.org/3/',
        },
    });
    const [tvDetails, setTvDetails] = useState({});
    const { tvId } = useParams();
    //console.log(`${tvId}`);
    const fetchAPIData = (endpoint) => __awaiter(this, void 0, void 0, function* () {
        const API_KEY = global.api.apiKey;
        const API_URL = global.api.apiUrl;
        window.showSpinner();
        const response = yield fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
        const data = yield response.json();
        window.hideSpinner();
        return data;
    });
    useEffect(() => {
        //console.log(global.api.apiKey);
        const init = () => __awaiter(this, void 0, void 0, function* () {
            const newTvDetails = yield fetchAPIData(`tv/${tvId}`);
            console.log(tvDetails);
            //TODO Create response validation check to & show error message if it fails
            setTvDetails(newTvDetails);
        });
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => { }, [tvDetails]);
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: "container" },
            React.createElement("div", { className: "back" },
                React.createElement(Link, { className: "btn", to: "/shows", fieldname: "enroll_header_now" }, "Back To Tv Shows")),
            React.createElement("div", { id: "movie-details" },
                Object.keys(tvDetails).length && (React.createElement("div", { style: { backgroundImage: `url("https://image.tmdb.org/t/p/original/${tvDetails.backdrop_path}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        zIndex: '-1',
                        opacity: '0.1'
                    } })),
                Object.keys(tvDetails).length && (React.createElement("div", null,
                    React.createElement("div", { className: "details-top" },
                        React.createElement("div", null,
                            React.createElement("img", { src: (typeof tvDetails.poster_path === 'string' && tvDetails.poster_path.length) ? `https://image.tmdb.org/t/p/w500${tvDetails.poster_path}` : '../images/no-image.jpg', className: "card-img-top", alt: tvDetails.title })),
                        React.createElement("div", { style: { "margin-left": "30px" } },
                            React.createElement("h2", { style: { "font-weight": "bold", "font-size": "1.5em" } }, tvDetails.name),
                            React.createElement("p", null,
                                React.createElement(FontAwesomeIcon, { icon: faStar, style: { "color": "#f1c40f", } }),
                                "\u00A0",
                                tvDetails.vote_average.toFixed(1),
                                " / 10"),
                            React.createElement("p", { className: "text-muted" },
                                "Last Air Date: ",
                                tvDetails.last_air_date),
                            React.createElement("p", null, tvDetails.overview),
                            React.createElement("h5", null, "Genres"),
                            React.createElement("ul", { className: "list-group" }, tvDetails.genres.map((genre) => { return React.createElement("li", null, genre.name); })),
                            React.createElement("a", { href: tvDetails.homepage, target: "_blank", className: "btn" }, "Visit Show Homepage"))),
                    React.createElement("div", { className: "details-bottom" },
                        React.createElement("h2", null, "Show Info"),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-secondary" }, "Number of Episodes:\u00A0 "),
                                tvDetails.number_of_episodes),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-secondary" }, "Last Episode To Air:\u00A0 "),
                                tvDetails.last_episode_to_air.name),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-secondary" }, "Status:\u00A0 "),
                                " ",
                                tvDetails.status)),
                        React.createElement("h4", { style: { "font-weight": "bold" } }, "Production Companies"),
                        React.createElement("div", { className: "list-group" }, tvDetails.production_companies.map((company, index, production_companies) => {
                            let comp_name = index + 1 === production_companies.length ? company.name : company.name + ",";
                            return React.createElement("span", null, comp_name + " ");
                        })))))))));
}
