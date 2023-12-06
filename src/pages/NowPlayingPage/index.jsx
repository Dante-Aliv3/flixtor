import React, {useContext, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MoviesPage from "../../pages/MoviesPage";
import {SessionContext} from "../../context/session";

export default function NowPlayingPage(props) {
  const {sessionData} = useContext(SessionContext);

  const [promoMovies, setPromoMovies] = useState({});
  const [popularMovies, setPopularMovies] = useState({});

  const fetchAPIData = async (endpoint) => {
    const API_KEY = sessionData.api.apiKey;
    const API_URL = sessionData.api.apiUrl;

    window.showSpinner();

    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
    );

    const data = await response.json();

    window.hideSpinner();

    return data;
  };

  useEffect(() => {
    //console.log(sessionData.api.apiKey);
    const init = async () => {
      //const {results: newMovies} = await fetchAPIData('movie/now_playing');
      //const {results: popularMovies} = await fetchAPIData('movie/popular');
      //const {results} = await fetchAPIData('movie/now_playing');
      //console.log(newMovies);
      const [newMoviesRes, popularMoviesRes] = await Promise.all([
        fetchAPIData("movie/now_playing"),
        fetchAPIData("movie/popular"),
      ]);

      const { results: newMovies } = await newMoviesRes;
      const { results: popularMovies } = await popularMoviesRes;

      setPromoMovies(newMovies);
      setPopularMovies(popularMovies);
    };
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

  return (
    <>
      {/*<section>
                <h1>Amazing scientists 8 - {sessionData.currentPage}</h1>
            </section>*/}

      {/* Now Playing Section */}
      <section className="now-playing" style={!sessionData.darkmode ? {background: 'white'} : null}>
        <h2 style={!sessionData.darkmode ? {backgroundColor: 'black'} : null}>Now Playing</h2>
        <div className="swiper">
          <div className="swiper-wrapper">
            {Object.keys(promoMovies).length &&
              promoMovies.map((movie) => {
                return (
                  <div className="swiper-slide">
                    <Link to={`/movie-details/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`${movie.title}`}
                      />
                    </Link>
                    <h4 className="swiper-rating">
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: "#f1c40f" }}
                      />
                      &nbsp;
                      {movie.vote_average} / 10
                    </h4>
                  </div>
                );
              })}

            {Object.keys(promoMovies).length && window.initSwiper()}
          </div>
        </div>
      </section>

      {/* Search Movies & TV Shows */}
      <section className="search"  style={!sessionData.darkmode ? {background: '#134e4a'} : null}>
        <div className="container">
          <div id="alert"></div>
          <form action="/flixx-app/search.html" className="search-form">
            {/* movies and shows radio box */}
            <div className="search-radio">
              <input
                type="radio"
                id="movie"
                name="type"
                value="movie"
                checked={false}
                onChange={() => {}}
              />
              <label htmlFor="movies">Movies</label>
              <input type="radio" id="tv" name="type" value="tv" />
              <label htmlFor="shows">TV Shows</label>
            </div>
            <div className="search-flex">
              <input
                type="text"
                name="search-term"
                id="search-term"
                placeholder="Enter search term"
              />
              <button className="btn" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Movies Component */}
      <MoviesPage />
    </>
  );
}
