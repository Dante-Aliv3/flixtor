import { Link, Route, Routes } from "react-router-dom";
import * as React from 'react';
import { useContext, useEffect, useState, useId } from 'react';
import { LayoutRoutes } from "../routes";
import { Switch } from '@headlessui/react';
import { SessionContext } from "../context/session";
// export {default as NowPlayingPage} from "./NowPlayingPage/base";
// export {
//     NavBar,
//     SideBar
// }
export function MainLayout({ children }) {
    const { sessionData, setSessionData } = useContext(SessionContext);
    const [showSlideOver, setshowSlideOver] = useState(false);
    const slideOverId = useId();
    function toggleDarkMode() {
        setSessionData((prevState) => {
            return Object.assign(Object.assign({}, prevState), { darkmode: !prevState.darkmode });
        });
    }
    useEffect(() => {
        sessionStorage.setItem('darkmode', sessionData.darkmode);
        // sessionStorage.removeItem("darkmode");
    }, [sessionData]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "w-screen h-screen flex items-center justify-center" },
            React.createElement("div", { id: "slideover-container", className: "w-full h-full inset-0" },
                React.createElement("div", { id: `slideover-bg-${slideOverId}`, className: "w-full h-full duration-500 ease-out transition-all inset-0 absolute" },
                    React.createElement("header", { className: "main-header", style: !sessionData.darkmode ? { background: '#134e4a' } : null },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "logo" },
                                React.createElement(Link, { to: "/" }, "FLIXTOR.ID")),
                            React.createElement(Switch, { checked: sessionData.darkmode, onChange: toggleDarkMode, className: `${sessionData.darkmode ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex h-6 w-11 items-center rounded-full` },
                                React.createElement("span", { className: "sr-only" }, "Use setting"),
                                React.createElement("span", { className: `${sessionData.darkmode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition` })),
                            React.createElement("div", { onClick: () => { setshowSlideOver(!showSlideOver); }, className: "cursor-pointer px-5 py-2 text-sm border text-white hover:text-black  hover:bg-gray-100 rounded border-gray-300" }, "Toggle Slide-over"),
                            React.createElement("nav", null,
                                React.createElement("ul", null,
                                    React.createElement("li", null,
                                        React.createElement(Link, { className: "nav-link", to: "/movies" }, "Movies")),
                                    React.createElement("li", null,
                                        React.createElement(Link, { className: "nav-link", to: "/shows" }, "TV Shows")))))),
                    children,
                    React.createElement("footer", { className: "main-footer", style: !sessionData.darkmode ? { background: '#134e4a' } : null },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "logo" },
                                React.createElement("span", null, "FLIXTOR.ID")),
                            React.createElement("div", { className: "social-links" },
                                React.createElement("a", { href: "https://www.facebook.com", target: "_blank" },
                                    React.createElement("i", { className: "fab fa-facebook-f" })),
                                React.createElement("a", { href: "https://www.twitter.com", target: "_blank" },
                                    React.createElement("i", { className: "fab fa-twitter" })),
                                React.createElement("a", { href: "https://www.instagram.com", target: "_blank" },
                                    React.createElement("i", { className: "fab fa-instagram" }))))),
                    React.createElement("div", { className: "spinner" })),
                React.createElement("div", { id: `slideover-${slideOverId}`, className: `w-2/5 bg-white h-full absolute right-0 duration-300 ease-out transition-all z-[100] ${showSlideOver ? '' : 'translate-x-full'}` },
                    React.createElement("div", { className: "absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5" },
                        React.createElement("svg", { className: "w-6 h-6", onClick: () => { setshowSlideOver(!showSlideOver); }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                            React.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M6 18L18 6M6 6l12 12" }))))))));
}
export default function PageContainer(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/*", element: React.createElement(MainLayout, null,
                    React.createElement(LayoutRoutes, null)) }))));
}
