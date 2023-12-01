import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TvShowsContainer(props) {
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

  const [tvShows, settvShows] = useState({});

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
      const { results: newtvShows } = await fetchAPIData("tv/popular");
      //console.log(newtvShows);
      settvShows(newtvShows);
    };
    init();

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
    <>
      {/*<section>
                <h1>Amazing scientists 8 - {global.currentPage}</h1>
            </section>*/}

      {/* Popular TV Shows  */}
      <section className="container">
        <h2>Popular TV Shows</h2>
        <div id="popular-shows" className="grid">
          {Object.keys(tvShows).length &&
            tvShows.map((show) => {
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
    </>
  );
}
