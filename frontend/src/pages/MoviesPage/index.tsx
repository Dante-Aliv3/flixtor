import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../../context/session.context.tsx";
import { MovieData } from "../../utils/types/app.types";
import TvShowsContainer from "../TvShowsPage";

const MoviesPage: React.FC = () => {
  const session = useContext(SessionContext);
  const [promoMovies, setPromoMovies] = useState({});
  const [popularMovies, setPopularMovies]: any = useState({});
  const sessionData =
    session.sessionData?.sessionData !== null ? session.sessionData : undefined;
  const setSessionData =
    session?.setSessionData !== null ? session?.setSessionData : undefined;
  const fetchAPIData = async (endpoint: string) => {
    const API_KEY: string | undefined = sessionData?.api.apiKey;
    const API_URL: string | undefined = sessionData?.api.apiUrl;

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

      {/* Popular Movies */}
      <section
        className="container"
        style={
          !sessionData?.darkmode
            ? {
                background: "white",
                maxWidth: "none",
                padding: "0px",
                margin: "0px",
              }
            : {}
        }
      >
        <h2>Popular Movies</h2>
        <div id="popular-movies" className="grid">
          {Object.keys(popularMovies).length &&
            popularMovies.map((movie: MovieData) => {
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
                    <h5 className="card-title" style={{ color: "white" }}>
                      {movie.title}
                    </h5>
                    <p className="card-text">
                      <small className="text-muted" style={{ color: "white" }}>
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
};

export default MoviesPage;
