import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { TVData } from "../../utils/types/app.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { updateTvShows } from "../../store/slices/tvShows.slice.ts";
import { init } from "../../utils/GlobalFunctions/initialize.ts";
const TvShowsContainer: React.FC = () => {
  const sessionData = useSelector((state: RootState) => state.session);
  const tvShows = useSelector((state: RootState) => state.tvshows);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log(sessionData.api.apiKey);
    init(dispatch, sessionData, "tv/popular", tvShows, updateTvShows);
  }, []);

  return (
    <Fragment>
      {/* Popular TV Shows  */}
      <section
        className="container"
        style={
          !sessionData?.darkmode
            ? {
                background: "white",
                color: "black",
                maxWidth: "none",
                padding: "0px",
                margin: "0px",
              }
            : {}
        }
      >
        <h2>Popular TV Shows</h2>
        <div id="popular-shows" className="grid">
          {Object.keys(tvShows).length &&
            tvShows.map((show: TVData) => {
              return (
                <div className="card">
                  <Link to={`/tv-details/${show.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={`${show.title}`}
                    />
                  </Link>
                  <h4 className="card-body">
                    <h5 className="card-title">{show.name}</h5>
                    <p className="card-text">
                      <small className="text-muted">
                        Air Date: {show.first_air_date}
                      </small>
                    </p>
                  </h4>
                </div>
              );
            })}
        </div>
      </section>
    </Fragment>
  );
};
export default TvShowsContainer;
