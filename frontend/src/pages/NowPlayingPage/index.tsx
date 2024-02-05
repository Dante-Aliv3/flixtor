import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MoviesPage from "../../pages/MoviesPage";
import { MovieData } from "../../utils/types/app.types";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePromoMovies,
  updatePopularMovies,
} from "../../store/slices/movies.slice.ts";
import { RootState } from "../../store/store.ts";
import { init } from "../../utils/GlobalFunctions/initialize.ts";
const NowPlayingPage: React.FC = () => {
  const sessionData = useSelector((state: RootState) => state.session);
  const promoMovies = useSelector(
    (state: RootState) => state.movies.promoMovies,
  );
  const popularMovies = useSelector(
    (state: RootState) => state.movies.popularMovies,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    init(
      dispatch,
      sessionData,
      "movie/now_playing",
      promoMovies,
      updatePromoMovies,
    );
  }, []);

  useEffect(() => {
    init(
      dispatch,
      sessionData,
      "movie/popular",
      popularMovies,
      updatePopularMovies,
    );
  }, []);

  // @ts-ignore
  return (
    <>
      {/* Now Playing Section */}
      <section
        className="now-playing"
        style={
          !sessionData?.darkmode ? { background: "white", color: "white" } : {}
        }
      >
        <h2 style={!sessionData?.darkmode ? { backgroundColor: "black" } : {}}>
          Now Playing
        </h2>
        <div className="swiper">
          <div className="swiper-wrapper">
            {promoMovies.length &&
              promoMovies.map((movie: MovieData) => {
                return (
                  <div className="swiper-slide" key={movie.id}>
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

            {promoMovies.length &&
              window.setTimeout(() => {
                window.initSwiper();
                // @ts-ignore
              }, "0000")}
          </div>
        </div>
      </section>

      {/* Search Movies & TV Shows */}
      <section
        className="search"
        style={!sessionData?.darkmode ? { background: "#134e4a" } : {}}
      >
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
};

export default NowPlayingPage;
