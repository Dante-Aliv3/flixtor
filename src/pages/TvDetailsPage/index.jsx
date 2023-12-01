import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

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
    const {tvId} = useParams();
    //console.log(`${tvId}`);

    const fetchAPIData = async (endpoint) => {
        const API_KEY = global.api.apiKey;
        const API_URL = global.api.apiUrl;

        window.showSpinner();

        const response = await fetch(
            `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
        );

        const data = await response.json();

        window.hideSpinner();

        return data;
    }

    useEffect(() => {
        //console.log(global.api.apiKey);
        const init = async () => {
            const newTvDetails = await fetchAPIData(`tv/${tvId}`);
            console.log(tvDetails);

            //TODO Create response validation check to & show error message if it fails

            setTvDetails(newTvDetails);
        }
        init();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { }, [tvDetails]);

    return (
        <>
            {/*<section>
                <h1>Amazing scientists 8 - {global.currentPage}</h1>
            </section>*/}

            {/* Movie Details */}
            <section className="container">
                <div className="back">
                    <Link className="btn" to="/shows" fieldname="enroll_header_now">Back To Tv Shows</Link>
                </div>

                {/* Movie Background Poster */}
                <div id="movie-details">
                    {Object.keys(tvDetails).length && (
                            <div style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${tvDetails.backdrop_path}")`,
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
                            }}></div>
                        )
                    }

                    {/* Movie Details Output */}
                    {Object.keys(tvDetails).length && (
                        <div>
                            <div className="details-top">
                                <div>
                                    <img src={ (typeof tvDetails.poster_path  === 'string' && tvDetails.poster_path.length) ? `https://image.tmdb.org/t/p/w500${tvDetails.poster_path}` : '../images/no-image.jpg'} className="card-img-top" alt={tvDetails.title}/>
                                </div>
                                <div style={{"margin-left": "30px"}}>
                                    <h2 style={{"font-weight": "bold", "font-size": "1.5em"}}>{tvDetails.name}</h2>
                                    <p>
                                        <FontAwesomeIcon icon={faStar} style={{"color": "#f1c40f",}} />&nbsp;
                                        {tvDetails.vote_average.toFixed(1)} / 10
                                    </p>
                                    <p className="text-muted">Last Air Date: {tvDetails.last_air_date}</p>
                                    <p>
                                        {tvDetails.overview}
                                    </p>
                                    <h5>Genres</h5>
                                    <ul className="list-group">
                                        {tvDetails.genres.map((genre) => {return <li>{genre.name}</li>})}
                                    </ul>
                                    <a href={tvDetails.homepage} target="_blank" className="btn">Visit Show Homepage</a>
                                </div>
                            </div>
                            <div className="details-bottom">
                                <h2>Show Info</h2>
                                <ul>
                                    <li>
                                        <span className="text-secondary">Number of Episodes:&nbsp; </span>
                                        {tvDetails.number_of_episodes}
                                    </li>
                                    <li><span className="text-secondary">Last Episode To Air:&nbsp; </span>
                                        {tvDetails.last_episode_to_air.name}
                                    </li>
                                    <li><span className="text-secondary">Status:&nbsp; </span> {tvDetails.status}</li>
                                </ul>
                                <h4 style={{"font-weight": "bold"}}>Production Companies</h4>
                                <div className="list-group">
                                    {tvDetails.production_companies.map((company, index, production_companies) => {
                                        let comp_name =  index + 1 === production_companies.length ? company.name : company.name + ",";
                                        return <span>{comp_name + " "}</span>
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </section>
        </>
    );
}