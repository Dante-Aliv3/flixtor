import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieData } from "../../utils/types/app.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { updatePopularMovies } from "../../store/slices/movies.slice.ts";
import { init } from "../../utils/GlobalFunctions/initialize.ts";

const MoviesPage: React.FC = () => {
  const sessionData = useSelector((state: RootState) => state.session);
  const popularMovies = useSelector(
    (state: RootState) => state.movies.popularMovies,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log(sessionData.api.apiKey);
    init(
      dispatch,
      sessionData,
      "movie/popular",
      popularMovies,
      updatePopularMovies,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
                <div className="card" key={movie.id}>
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
