import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../../context/session.context.tsx";
import { TVData } from "../../utils/types/app.types";
const TvShowsContainer: React.FC = () => {
  const session = useContext(SessionContext);

  const [tvShows, settvShows]: any = useState({});
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
      const { results: newtvShows } = await fetchAPIData("tv/popular");
      //console.log(newtvShows);
      settvShows(newtvShows);
    };
    init();

    //setSessionData({...sessionData, darkmode: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //console.log(Object.keys(tvShows).length);
    //console.log(tvShows);
    /*Object.keys(tvShows).length && tvShows.map((card) => {
            console.log(card);
        });*/
  }, [tvShows]);

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
