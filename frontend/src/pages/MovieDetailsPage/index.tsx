import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FetchAPIData } from "../../utils/GlobalFunctions/fetch.ts";
import { SessionContent } from "../../context/session.context";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { sessionDataType } from "../../utils/types/app.types.ts";

export type ProductionCompaniesType = {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
};

export type MovieDetailsType = {
  production_companies?: ProductionCompaniesType[];
  status?: boolean;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  vote_average?: number;
  release_date?: string;
  overview?: string;
  homepage?: string;
  budget?: string;
  revenue?: string;
  runtime?: string;
  genres?: [];
};
const intiliaze = async (movieId: string, sessionData: sessionDataType) => {
  const newMovieDetails: MovieDetailsType = await FetchAPIData(
    `movie/${movieId}`,
    sessionData,
  );
  //console.log(newMovieDetails);

  //TODO Create response validation check to & show error message if it fails

  return newMovieDetails;
};

export const MovieDetailsPage: React.FC<{}> = (props) => {
  const sessionData = useSelector((state: RootState) => state.session);
  const { movieId = "" } = useParams<{ movieId: string }>();
  //const { movieId } = useParams() as { movieId: string };
  //console.log(`${movieId}`);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType>();

  useEffect(() => {
    //console.log(sessionData.api.apiKey);

    intiliaze(movieId, sessionData).then((data) => {
      setMovieDetails(data);
    });
  }, []);

  return (
    <>
      {/* Movie Details */}
      <section className="container">
        <div className="back">
          <Link className="btn" to="/">
            Back To Movies
          </Link>
        </div>

        {/* Movie Background Poster */}

        <div id="movie-details">
          {movieDetails && (
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
          {typeof movieDetails === "object" && (
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
                    {movieDetails["vote_average"] !== undefined &&
                      movieDetails.vote_average.toFixed(1)}{" "}
                    / 10
                  </p>
                  <p className="text-muted">
                    Release Date:
                    {movieDetails.release_date && movieDetails.release_date}
                  </p>
                  <p>{movieDetails.overview && movieDetails.overview}</p>
                  <h5>Genres</h5>
                  <ul className="list-group">
                    {Array.isArray(movieDetails["genres"]) &&
                      movieDetails.genres.map(
                        (genre: { id: number; name: string }) => {
                          return <li key={genre.id}>{genre.name}</li>;
                        },
                      )}
                  </ul>
                  <a
                    href={
                      movieDetails["homepage"] !== undefined
                        ? movieDetails.homepage
                        : ""
                    }
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
                    {movieDetails.budget &&
                      movieDetails.budget
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </li>
                  <li>
                    <span className="text-secondary">Revenue:</span> $
                    {movieDetails.revenue &&
                      movieDetails.revenue
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </li>
                  <li>
                    <span className="text-secondary">Runtime:</span>{" "}
                    {movieDetails.runtime && movieDetails.runtime} minutes
                  </li>
                  <li>
                    <span className="text-secondary">Status:</span>{" "}
                    {movieDetails.status && movieDetails.status}
                  </li>
                </ul>
                <h4>Production Companies</h4>
                <div className="list-group">
                  {Array.isArray(movieDetails["production_companies"]) &&
                    movieDetails.production_companies.map((company, index) => {
                      return (
                        <span key={company.id}>
                          {(index ? ", " : "") + company.name}
                        </span>
                      );
                    })}
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
