import { Link, Route, Routes, Outlet } from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
import { LayoutRoutes } from "../routes";
import { Switch } from '@headlessui/react';
import { SessionContext } from "../context/session";

// export {default as NowPlayingPage} from "./NowPlayingPage/base";

// export {
//     NavBar,
//     SideBar
// }
export function MainLayout({ children }) {
  const {sessionData, setSessionData} = useContext(SessionContext);
    function toggleDarkMode () {
        setSessionData((prevState) => {
            return { ...prevState, darkmode: !prevState.darkmode};
        });
    }

    useEffect(() => {
        sessionStorage.setItem( 'darkmode', sessionData.darkmode );
        // sessionStorage.removeItem("darkmode");
    }, [sessionData]);

  return (
    <>
      <header className="main-header"  style={!sessionData.darkmode ? {background: '#134e4a'} : null}>
        <div className="container">
          <div className="logo">
            <Link to="/">FLIXTOR.ID</Link>
          </div>
            <Switch
                checked={sessionData.darkmode}
                onChange={toggleDarkMode}
                className={`${
                    sessionData.darkmode ? 'bg-teal-900' : 'bg-teal-700'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    className={`${
                        sessionData.darkmode ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
            </Switch>
          <nav>
            <ul>
              <li>
                <Link className="nav-link" to="/movies">
                  Movies
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/shows">
                  TV Shows
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/*<Outlet />*/}
      {children}

      {/* Footer */}
      <footer className="main-footer"  style={!sessionData.darkmode ? {background: '#134e4a'} : null}>
        <div className="container">
          <div className="logo">
            <span>FLIXTOR.ID</span>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>

      <div className="spinner"></div>
    </>
  );
}

export default function PageContainer(props) {
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <MainLayout>
              <LayoutRoutes />
            </MainLayout>
          }
        ></Route>
      </Routes>
    </>
  );
}
