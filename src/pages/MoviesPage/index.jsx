import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MoviesPage(props) {
  const [global, setGlobal] = useState({
    currentPage: window.location.pathname,
    search: {
      term: "",
      type: "",
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
    api: {
      apiKey: "db1a3d4fc9949395b6300a619305310d",
      apiUrl: "https://api.themoviedb.org/3/",
    },
  });

  const [promoMovies, setPromoMovies] = useState({});
  const [popularMovies, setPopularMovies] = useState({});

  const fetchAPIData = async (endpoint) => {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;

    window.showSpinner();

    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
    );

    const data = await response.json();

    window.hideSpinner();

    return data;
  };

  useEffect(() => {
    //console.log(global.api.apiKey);
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
                <h1>Amazing scientists 8 - {global.currentPage}</h1>
            </section>*/}

      {/* Popular Movies */}
      <section className="container">
        <h2>Popular Movies</h2>
        <div id="popular-movies" className="grid">
          {Object.keys(popularMovies).length &&
            popularMovies.map((movie) => {
              return (
                <div className="card">
                  <Link to={`/movie-details/${movie.id}`}>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : `../images/no-image.jpg`
                      }
                      className="card-img-top"
                      alt={`${movie.title}`}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      <small className="text-muted">
                        Release: {movie.release_date}
                      </small>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
