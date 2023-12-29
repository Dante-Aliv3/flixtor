import * as React from "react";
import { Link, Route, Routes, Outlet } from "react-router-dom";
import {
  useContext,
  useEffect,
  useState,
  useId,
  FunctionComponent,
} from "react";
import { LayoutRoutes } from "../routes";
import {
  SessionContent,
  SessionContext,
  sessionDataType,
} from "../context/session.context";
import { Props } from "../utils/types/react.types";
const { Switch } = await import("@headlessui/react");

// export {default as NowPlayingPage} from "./NowPlayingPage/base";

// export {
//     NavBar,
//     SideBar
// }

export const MainLayout: FunctionComponent<Props> = ({ children }) => {
  const session = useContext(SessionContext);
  const [showSlideOver, setshowSlideOver]: any = useState(false);
  const slideOverId: any = useId();
  const sessionData =
    session.sessionData?.sessionData !== null ? session.sessionData : undefined;
  const setSessionData =
    session?.setSessionData !== null ? session?.setSessionData : undefined;
  function toggleDarkMode() {
    if (setSessionData !== null) {
      session?.setSessionData((prevState: sessionDataType) => {
        return { ...(prevState as object), darkmode: !prevState.darkmode };
      });
    }
  }

  useEffect(() => {
    sessionStorage.setItem(
      "darkmode",
      JSON.stringify(session?.sessionData?.darkmode),
    );
    // sessionStorage.removeItem("darkmode");
  }, [session?.sessionData]);

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <div id="slideover-container" className="w-full h-full inset-0">
          <div
            id={`slideover-bg-${slideOverId}`}
            className="w-full h-full duration-500 ease-out transition-all inset-0 absolute"
          >
            <header
              className="main-header"
              style={
                !sessionData?.darkmode
                  ? { background: "#134e4a", color: "white" }
                  : undefined
              }
            >
              <div className="container">
                <div className="logo">
                  <Link to="/">FLIXTOR.ID</Link>
                </div>
                <Switch
                  checked={sessionData?.darkmode}
                  onChange={toggleDarkMode}
                  className={`${
                    sessionData?.darkmode ? "bg-teal-900" : "bg-teal-700"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={`${
                      sessionData?.darkmode ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <div
                  onClick={() => {
                    setshowSlideOver(!showSlideOver);
                  }}
                  className="cursor-pointer px-5 py-2 text-sm border text-white hover:text-black  hover:bg-gray-100 rounded border-gray-300"
                >
                  Toggle Slide-over
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

            {/*<Outlet />*/}
            {children}

            {/* Footer */}
            <footer
              className="main-footer"
              style={
                !sessionData?.darkmode ? { background: "#134e4a" } : undefined
              }
            >
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
          </div>
          <div
            id={`slideover-${slideOverId}`}
            className={`w-2/5 bg-white h-full absolute right-0 duration-300 ease-out transition-all z-[100] ${
              showSlideOver ? "" : "translate-x-full"
            }`}
          >
            <div className="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5">
              <svg
                className="w-6 h-6"
                onClick={() => {
                  setshowSlideOver(!showSlideOver);
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PageContainer: React.FC<Props> = ({ children }) => {
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
};

export default PageContainer;
