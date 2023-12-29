import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  SessionContent,
  SessionContext,
} from "../../context/session.context.tsx";
import { Props } from "../../utils/types/react.types";
import * as globalDeclarations from "../../utils/types/window.types";
import NowPlayingPage from "../NowPlayingPage";

const MovieDetailsPage: React.FC = () => {
  const session = useContext(SessionContext);
  const [movieDetails, setMovieDetails]: any = useState({});
  const { movieId } = useParams();
  const sessionData =
    session.sessionData?.sessionData !== null ? session.sessionData : undefined;
  const setSessionData =
    session?.setSessionData !== null ? session?.setSessionData : undefined;
  //console.log(`${movieId}`);

  type MovieData = {
    backdrop_path: string;
  };

  const fetchAPIData = async (endpoint: string) => {
    const API_KEY: string | undefined = sessionData?.api.apiKey;
    const API_URL: string | undefined = sessionData?.api.apiUrl;

    if (window.showSpinner) {
      window.showSpinner();
    }

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
      const newMovieDetails: MovieData = await fetchAPIData(`movie/${movieId}`);
      console.log(movieDetails);

      //TODO Create response validation check to & show error message if it fails

      setMovieDetails(newMovieDetails);
    };
    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/*<section>
                <h1>Amazing scientists 8 - {sessionData.currentPage}</h1>
            </section>*/}

      {/* Movie Details */}
      <section className="container">
        <div className="back">
          <Link className="btn" to="/">
            Back To Movies
          </Link>
        </div>

        {/* Movie Background Poster */}
        <div id="movie-details">
          {Object.keys(movieDetails).length && (
            <div
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                width: "100vw",
                position: "absolute",
                top: "0px",
                left: "0px",
                zIndex: "-1",
                opacity: "0.1",
              }}
            ></div>
          )}

          {/* Movie Details Output */}
          {Object.keys(movieDetails).length && (
            <div>
              <div className="details-top">
                <div>
                  <img
                    src={
                      typeof movieDetails.poster_path === "string" &&
                      movieDetails.poster_path.length
                        ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                        : "../images/no-image.jpg"
                    }
                    className="card-img-top"
                    alt={movieDetails.title}
                  />
                </div>
                <div style={{ marginLeft: "30px" }}>
                  <h2>{movieDetails.title}</h2>
                  <p>
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f1c40f" }}
                    />
                    &nbsp;
                    {movieDetails.vote_average.toFixed(1)} / 10
                  </p>
                  <p className="text-muted">
                    Release Date: {movieDetails.release_date}
                  </p>
                  <p>{movieDetails.overview}</p>
                  <h5>Genres</h5>
                  <ul className="list-group">
                    {movieDetails.genres.map((genre: { name?: string }) => {
                      return <li>{genre.name}</li>;
                    })}
                  </ul>
                  <a
                    href={movieDetails.homepage}
                    target="_blank"
                    className="btn"
                  >
                    Visit Movie Homepage
                  </a>
                </div>
              </div>
              <div className="details-bottom">
                <h2>Movie Info</h2>
                <ul>
                  <li>
                    <span className="text-secondary">Budget:</span>$
                    {movieDetails.budget
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </li>
                  <li>
                    <span className="text-secondary">Revenue:</span> $
                    {movieDetails.revenue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </li>
                  <li>
                    <span className="text-secondary">Runtime:</span>{" "}
                    {movieDetails.runtime} minutes
                  </li>
                  <li>
                    <span className="text-secondary">Status:</span>{" "}
                    {movieDetails.status}
                  </li>
                </ul>
                <h4>Production Companies</h4>
                <div className="list-group">
                  {movieDetails.production_companies.map(
                    (
                      company: { name: string },
                      index: number,
                      production_companies: [],
                    ) => {
                      let comp_name =
                        index + 1 === production_companies.length
                          ? company.name
                          : company.name + ",";
                      return <span>{comp_name + " "}</span>;
                    },
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default MovieDetailsPage;
