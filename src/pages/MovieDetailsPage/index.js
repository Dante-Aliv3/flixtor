"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const session_1 = require("../../context/session");
function MovieDetailsPage(props) {
    const { sessionData } = (0, react_1.useContext)(session_1.SessionContext);
    const [movieDetails, setMovieDetails] = (0, react_1.useState)({});
    const { movieId } = (0, react_router_dom_1.useParams)();
    const fetchAPIData = (endpoint) => __awaiter(this, void 0, void 0, function* () {
        const API_KEY = sessionData.api.apiKey;
        const API_URL = sessionData.api.apiUrl;
        window.showSpinner();
        const response = yield fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
        const data = yield response.json();
        window.hideSpinner();
        return data;
    });
    (0, react_1.useEffect)(() => {
        const init = () => __awaiter(this, void 0, void 0, function* () {
            const newMovieDetails = yield fetchAPIData(`movie/${movieId}`);
            console.log(movieDetails);
            setMovieDetails(newMovieDetails);
        });
        init();
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { className: "container" },
            React.createElement("div", { className: "back" },
                React.createElement(react_router_dom_1.Link, { className: "btn", to: "/" }, "Back To Movies")),
            React.createElement("div", { id: "movie-details" },
                Object.keys(movieDetails).length && (React.createElement("div", { style: { backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}")`,
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
                Object.keys(movieDetails).length && (React.createElement("div", null,
                    React.createElement("div", { className: "details-top" },
                        React.createElement("div", null,
                            React.createElement("img", { src: (typeof movieDetails.poster_path === 'string' && movieDetails.poster_path.length) ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : '../images/no-image.jpg', className: "card-img-top", alt: movieDetails.title })),
                        React.createElement("div", { style: { "margin-left": "30px" } },
                            React.createElement("h2", null, movieDetails.title),
                            React.createElement("p", null,
                                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faStar, style: { "color": "#f1c40f", } }),
                                "\u00A0",
                                movieDetails.vote_average.toFixed(1),
                                " / 10"),
                            React.createElement("p", { className: "text-muted" },
                                "Release Date: ",
                                movieDetails.release_date),
                            React.createElement("p", null, movieDetails.overview),
                            React.createElement("h5", null, "Genres"),
                            React.createElement("ul", { className: "list-group" }, movieDetails.genres.map((genre) => { return React.createElement("li", null, genre.name); })),
                            React.createElement("a", { href: movieDetails.homepage, target: "_blank", className: "btn" }, "Visit Movie Homepage"))),
                    React.createElement("div", { className: "details-bottom" },
                        React.createElement("h2", null, "Movie Info"),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-secondary" }, "Budget:"),
                                "$",
                                movieDetails.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-secondary" }, "Revenue:"),
                                " $",
                                movieDetails.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-secondary" }, "Runtime:"),
                                " ",
                                movieDetails.runtime,
                                " minutes"),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-secondary" }, "Status:"),
                                " ",
                                movieDetails.status)),
                        React.createElement("h4", null, "Production Companies"),
                        React.createElement("div", { className: "list-group" }, movieDetails.production_companies.map((company, index, production_companies) => {
                            let comp_name = index + 1 === production_companies.length ? company.name : company.name + ",";
                            return React.createElement("span", null, comp_name + " ");
                        })))))))));
}
exports.default = MovieDetailsPage;
//# sourceMappingURL=index.js.map