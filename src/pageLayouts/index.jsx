import { Link, Route, Routes, Outlet } from "react-router-dom";
import React, { useContext } from 'react';
import { LayoutRoutes } from "../routes";
import NotFound from "../pages/NotFound";
import { SessionContext } from "../context/session";

// export {default as NowPlayingPage} from "./NowPlayingPage/base";

// export {
//     NavBar,
//     SideBar
// }
export function MainLayout({ children }) {
  const {sessionData, setSessionData} = useContext(SessionContext);

  return (
    <>
      <header className="main-header">
        <div className="container">
          <div className="logo">
            <Link to="/">FLIXTOR.ID</Link>
          </div>
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

      {'darkmode active: ' +  JSON.stringify(sessionData.darkmode)}
      {console.log(sessionData)}

      {/*<Outlet />*/}
      {children}

      {/* Footer */}
      <footer className="main-footer">
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
